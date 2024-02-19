import React from "react";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";

const RegistryItem = ({
  name,
  imageURL,
  productURL,
  price,
  currentGift,
  onSelect,
  isSelected,
}) => {
  const progress = Math.min((currentGift / price) * 100, 100);

  return (
    <div
      className="registry-item"
      style={{
        border: "3px solid #333",
        background: "linear-gradient(50deg, black, transparent)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        maxWidth: "275px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Checkbox
          color="primary"
          sx={{
            "&.Mui-checked": {
              color: "green",
            },
            "& .MuiSvgIcon-root": {
              width: 40, // Adjust width as needed
              height: 40, // Adjust height as needed
            },
            "& .MuiCheckbox-root": {
              padding: 0, // Remove padding to match the original checkbox size
            },
          }}
          style={{
            position: "relative",
            bottom: "-10px",
            height: "13px",
          }}
          checked={isSelected}
          onChange={() => onSelect(name)}
        />

        <h3>
          <a
            href={productURL}
            target="_blank"
            rel="noreferrer"
            style={{ color: "lightblue", cursor: "pointer" }}
          >
            {name}
          </a>
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <img
          src={imageURL}
          alt={name}
          style={{ maxHeight: "275px", maxWidth: "100%" }}
        />
      </div>
      <div>
        <p style={{ marginBottom: "0" }}>Price: ${price}</p>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: "7px",
            borderRadius: "7px",
            "& .MuiLinearProgress-barColorPrimary": {
              backgroundColor: "green",
            },
          }}
        />
      </div>
    </div>
  );
};

export default RegistryItem;
