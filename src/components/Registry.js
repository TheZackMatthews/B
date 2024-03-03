import React, { useState, useEffect } from "react";
import RegistryItem from "./RegistryItem";
import NavigationMenu from "./NavigationMenu";
import dotenv from "dotenv";

dotenv.config();

const RegistryPage = () => {
  const [registryItems, setRegistryItems] = useState([]);
  const [totalContributions, setTotalContributions] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

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
                {(100 * totalContributions[item] / (userTotalContribution + 0.00001)).toFixed(2)}
                {"%)"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegistryPage;
