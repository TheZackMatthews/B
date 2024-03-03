import React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

function Contact({ contact, setSpreadsheetValue, setEdit }) {
  const handleCheckboxClick = () => {
    const { firstName, lastName, email, rsvp } = contact;
    const newContact = {
      firstName,
      lastName,
      email,
      rsvp: !rsvp,
    };
    setSpreadsheetValue(newContact);
  };

  return (
    <div
      className="contact-card"
      style={{
        border: "3px solid #333",
        background: contact.rsvp ? "green" : "#800020",
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
          {contact.firstName} {contact.lastName}
        </p>
      </div>
      <div className="email">
        <p>{contact.email}</p>
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
              checked={contact?.rsvp}
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
