import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import RegistryItem from "./RegistryItem";
import NavigationMenu from "./NavigationMenu";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import dotenv from "dotenv";

dotenv.config();

const RegistryPage = () => {
  const [registryItems, setRegistryItems] = useState([]);
  const [totalContributions, setTotalContributions] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchDataFromGoogleSheet() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/registry`);
        const rows = await response.json();

        const percentContributions = rows.reduce((acc, [productName]) => {
          acc[productName] = 0;
          return acc;
        }, {});
        setTotalContributions(percentContributions);

        // Map rows to RegistryItem objects
        const items = rows.map((row) => ({
          name: row[0],
          imageURL: row[1],
          productURL: row[2],
          price: row[3],
          totalDollarContribution: row[4],
          percentageContributed: totalContributions[row[0]],
          updatePercentageContributed: (percentage, rowName) => {
            setTotalContributions((prevContributions) => {
              const updatedCont = {
                ...prevContributions,
                [rowName]: percentage,
              };
              return updatedCont;
            });
          },
          isSelected: false, // Initialize isSelected state for each item
        }));

        setRegistryItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromGoogleSheet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectItem = (name) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(name)) {
        // If the item is already selected, remove it
        return prevItems.filter((item) => item !== name);
      } else {
        // If the item is not selected, add it
        return [...prevItems, name];
      }
    });
  };

  const createOrder = (actions, val) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: val,
          },
        },
      ],
    });
  };

  const userTotalContribution = Object.values(totalContributions).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="banner-content">
      <NavigationMenu />
      <h2>Registry</h2>
      <p style={{ width: "90%", marginBottom: "300px" }}>
        We are deeply grateful to have our beloved friends and family join us
        for this special occasion. Your presence is the greatest gift, and we
        are truly honored by your support. While no gifts are expected, if you
        would like to contribute to our journey, we've included a few items that
        will enhance our honeymoon adventure. Your kindness and thoughtfulness
        mean the world to us.
      </p>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {registryItems.map((item, index) => (
          <RegistryItem
            key={index}
            {...item}
            handleSelectItem={handleSelectItem}
            isSelected={selectedItems.includes(item.name)}
            showSlider={selectedItems.length > 1}
          />
        ))}
      </div>
      <div className="selected-items" style={{ width: "90%" }}>
        <h2>How your gift will be split:</h2>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingBottom: "120px",
          }}
        >
          {selectedItems.map((item, index) => (
            <li key={index}>
              <p>
                {item}
                {" ("}
                {(
                  (100 * totalContributions[item]) /
                  (userTotalContribution + 0.00001)
                ).toFixed(0)}
                {"%)"}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant="contained"
        disabled={selectedItems.length === 0 || userTotalContribution === 0}
        color="primary"
        size="large"
        className="edit-button"
        style={{ background: "#333" }}
        onClick={openModal}
        sx={{ mb: 10 }}
      >
        Continue to payment
      </Button>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            sx={{ color: "black" }}
            variant="h6"
            component="h2"
          >
            Thank you for your gift!
          </Typography>
          <Typography id="modal-description" sx={{ color: "black" }}>
            Please set your donation amount.
          </Typography>
          <Input
            type="number"
            value={donationAmount}
            onChange={(event) => {
              const amount = parseFloat(event.target.value);
              if (!isNaN(amount) && amount > 0) {
                setDonationAmount(amount);
              } else {
                setDonationAmount(0); // Set to 0 if the input is not a valid number
              }

            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            sx={{ mb: 5 }}
          />
          <PayPalScriptProvider
            options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
          >
            <PayPalButtons
              disabled={donationAmount <= 0}
              forceReRender={[donationAmount]}
              fundingSource={undefined}
              createOrder={(data, actions) => createOrder(actions, donationAmount)}
              onApprove={(details, data) => {
                const donationAmounts = selectedItems.map((item) =>
                  (
                    (donationAmount * totalContributions[item]) /
                    userTotalContribution
                  ).toFixed(2)
                );
                closeModal();
                return fetch(
                  `${process.env.REACT_APP_BASE_URL}/paypal-transaction-complete`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      amounts: donationAmounts,
                      itemNames: selectedItems,
                      payerEmail: email,
                    }),
                  }
                ).then(
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000)
                );
              }}
              onError={(err) => {
                console.error(err);
                setIsModalOpen(false);
                setTimeout(() => {
                  setIsModalOpen(true);
                }, 500);
              }}
            ></PayPalButtons>
          </PayPalScriptProvider>
          <Button
            color="primary"
            size="large"
            className="edit-button"
            style={{ background: "#333", color: "white" }}
            onClick={closeModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RegistryPage;
