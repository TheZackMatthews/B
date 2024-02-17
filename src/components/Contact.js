import React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

function Contact({ firstName, lastName, email, rsvp, toggleRSVP, setEdit }) {
  const handleCheckboxClick = () => {
    toggleRSVP();
    console.log("hello world");
    // Save RSVP to server
  };

  return (
    <div
      className="contact-card"
      style={{
        border: "3px solid #333",
        background: rsvp ? "green" : "#800020",
        borderRadius: "10px",
        padding: "10px",
        margin: "5vh 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="name"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="email">
        <p>{email}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <label>RSVP</label>
            <Checkbox
              checked={rsvp}
              onClick={handleCheckboxClick}
              inputProps={{ "aria-label": "RSVP checkbox" }}
              style={{ color: "white" }}
              sx={{
                "& .MuiSvgIcon-root": {
                  width: "36px", // Adjust the width of the check mark
                  height: "36px", // Adjust the height of the check mark
                },
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setEdit()}
            className="edit-button"
            style={{ background: "#333" }}
          >
            Edit Contact
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
