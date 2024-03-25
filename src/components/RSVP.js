import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, IconButton, Typography } from "@mui/material";
import dotenv from "dotenv";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import Contact from "./Contact";
import NavigationMenu from "./NavigationMenu";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

dotenv.config();

const RSVP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const unfilteredEmail = queryParams.get("email");
  const initEmail = unfilteredEmail === "null" ? "" : unfilteredEmail;
  const [isEditingContact, setIsEditingContact] = useState(false);
  let sheetContact = {
    firstName: "",
    lastName: "",
    email: initEmail,
    rsvp: false,
  };
  const [contact, setContact] = useState(sheetContact);
  const [newEmail, setNewEmail] = useState("");

  const setSpreadsheetValue = async (newValue) => {
    try {
      await fetch(`${process.env.baseURL}/users?userEmail=${contact.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newValue),
      })
        .then(function (response) {
          // Parse the data into a useable format using `.json()`
          return response.json();
        })
        .then(async function () {
          try {
            await fetch(
              `${process.env.baseURL}/users?userEmail=${contact.email}`
            )
              .then(function (response) {
                // Parse the data into a useable format using `.json()`
                return response.json();
              })
              .then(function (foundUser) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                setContact({
                  firstName: (foundUser && foundUser[0]) ?? "",
                  lastName: (foundUser && foundUser[1]) ?? "",
                  email: (foundUser && foundUser[2]) ?? "",
                  rsvp: (foundUser && foundUser[3]) === "TRUE" ?? false,
                });
              });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `${process.env.baseURL}/users?userEmail=${contact.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const foundUser = await response.json();

        setContact({
          firstName: (foundUser && foundUser[0]) ?? "",
          lastName: (foundUser && foundUser[1]) ?? "",
          email: initEmail,
          rsvp: (foundUser && foundUser[3]) === "TRUE" ?? false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert(
          "Unable to find Email in database. Attempting to recover."
        );
        window.location.href = "/rsvp";
      }
    }

    if (initEmail) {
      fetchUser();
    }
  }, [contact.email, initEmail]);

  const setEditTrue = () => {
    setIsEditingContact(true);
  };

  return (
    <div className="banner-content">
      <NavigationMenu />
      <Modal open={!initEmail}>
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
          <Typography sx={{ color: "black", mb: "1em" }} component="p">
            To access this feature, we'll need your email. You can either return
            to your inbox and click the invitation or simply enter the email
            address where you received the invitation below.
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Refresh the page with query parameter 'email' equal to the input value
              window.location.href = `/rsvp?email=${encodeURIComponent(
                newEmail
              )}`;
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              style={{ height: "2em" }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!newEmail}
              style={{
                background: newEmail ? "#333" : "#ddd",
                color: "white",
                marginLeft: "1em",
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      {!isEditingContact && (
        <Contact
          contact={contact}
          setSpreadsheetValue={setSpreadsheetValue}
          setEdit={setEditTrue}
        />
      )}
      {isEditingContact && (
        <div
          style={{
            border: "3px solid #333",
            background: contact.rsvp ? "#008000" : "#800020",
            borderRadius: "10px",
            padding: "10px",
            margin: "5vh 0",
          }}
        >
          <IconButton
            onClick={() => setIsEditingContact(false)}
            style={{
              position: "relative",
              bottom: 10,
              left: 10,
              float: "right",
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2>RSVP Now</h2>
          <Formik
            initialValues={{
              firstName: contact.firstName,
              lastName: contact.lastName,
              email: contact.email,
            }}
            validationSchema={validationSchema} // Add validation schema
            onSubmit={async (values) => {
              setIsEditingContact(false);
              setContact({ ...values, rsvp: contact.rsvp });
              // Update the search property of the location

              queryParams.set("email", values.email);
              const newUrl = `${
                window.location.pathname
              }?${queryParams.toString()}`;
              window.history.pushState({}, "", newUrl);

              await setSpreadsheetValue({ ...values, rsvp: contact.rsvp });
            }}
          >
            {({ isValid }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="firstName">First Name</label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder={contact.firstName}
                />
                <ErrorMessage name="firstName" component="div" />

                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" component="div" />

                <label htmlFor="email">Email</label>
                <Field name="email" type="email" autoComplete="email" />
                <ErrorMessage name="email" component="div" />

                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  size="small"
                  type="submit"
                  className="edit-button"
                  style={{
                    background: isValid ? "#333" : "#ddd",
                    marginTop: "10px",
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RSVP;
