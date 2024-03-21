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
import { PayPalButton } from "react-paypal-button-v2";
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
        const response = await fetch(`${process.env.baseURL}/registry`);
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
          />
        ))}
      </div>
      <div className="selected-items" style={{ width: "90%" }}>
        <h2>Selected Items:</h2>
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
              setDonationAmount(event.target.value);
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            sx={{ mb: 5 }}
          />

          <PayPalButton
            amount={donationAmount.toString()}
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onError={(error) => {
              console.log(error);
              alert("Error processing transaction");
            }}
            onSuccess={(details, data) => {
              const donationAmounts = selectedItems.map((item) =>
                (
                  (donationAmount * totalContributions[item]) /
                  userTotalContribution
                ).toFixed(2)
              );
              closeModal();
              return fetch(
                `${process.env.baseURL}/paypal-transaction-complete`,
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
            options={{
              clientId: process.env.PAYPAL_CLIENT_ID,
            }}
          />
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
