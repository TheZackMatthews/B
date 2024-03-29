import React from "react";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import Slider from "@mui/material/Slider";

const RegistryItem = ({
  handleSelectItem,
  imageURL,
  isSelected,
  name,
  percentageContributed,
  price,
  productURL,
  totalDollarContribution,
  updatePercentageContributed,
  showSlider,
}) => {
  const progress = Math.min((totalDollarContribution / price) * 100, 100);

  const handleSliderClick = () => {
    if (!isSelected) {
      handleSelectItem(name);
      updatePercentageContributed(100, name);
    }
  };

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
          disableRipple={true} // Disable click animation
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
          onChange={() => {
            handleSelectItem(name);
            if (isSelected) {
              updatePercentageContributed(0, name);
            } else {
              updatePercentageContributed(100, name);
            }
          }}
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
          style={{ height: "275px", maxWidth: "100%" }}
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
        <div onClick={handleSliderClick}>
          <Slider
            defaultValue={100}
            value={percentageContributed}
            onChange={(event) => {
              updatePercentageContributed(event.target.value, name);
            }}
            sx={{
              height: "7px",
              borderRadius: "7px",
              visibility: showSlider? "visible" : "hidden",
            }}
            disabled={!isSelected}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistryItem;
