import React, { useState, useEffect } from "react";
import RegistryItem from "./RegistryItem";
import NavigationMenu from "./NavigationMenu";

const RegistryPage = () => {
  const [registryItems, setRegistryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    async function fetchDataFromGoogleSheet() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet2!A2:E9?key=${process.env.GOOGLE_API_KEY}`
        );

        const rows = (await response.json())?.values;
        console.log(rows);

        // Map rows to RegistryItem objects
        const items = rows.map((row) => ({
          name: row[0],
          imageURL: row[1],
          productURL: row[2],
          price: row[3],
          currentGift: row[4],
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
      const index = prevItems.indexOf(name);
      if (index !== -1) {
        return prevItems.filter((item) => item !== name);
      } else {
        return [...prevItems, name];
      }
    });
  };

  return (
    <div className="banner-content">
      <NavigationMenu />
      <h2>Registry</h2>
      <p style={{ width: "90%", marginBottom: "300px"}}>
        We are deeply grateful to have our beloved friends and family join us
        for this special occasion. Your presence is the greatest gift, and we
        are truly honored by your support. While no gifts are expected, if you
        would like to contribute to our journey, we've included a few items that
        will enhance our honeymoon adventure. Your kindness and thoughtfulness
        mean the world to us.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {registryItems.map((item, index) => (
          <RegistryItem
            key={index}
            {...item}
            onSelect={handleSelectItem}
            isSelected={selectedItems.includes(item.name)}
          />
        ))}
      </div>
      <div className="selected-items">
        <h2>Selected Items:</h2>
        <ul style={{ display: "flex", flexDirection: "column" }}>
          {selectedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegistryPage;
