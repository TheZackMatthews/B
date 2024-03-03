import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import dotenv from "dotenv";
import { ErrorMessage, Formik, Field, Form } from "formik";
import NavigationMenu from "./NavigationMenu";
import Contact from "./Contact";
import * as Yup from "yup";

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
        await fetch(`${process.env.baseURL}/users?userEmail=${contact.email}`)
          .then(function (response) {
            // Parse the data into a useable format using `.json()`
            return response.json();
          })
          .then(function (foundUser) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            setContact({
              firstName: (foundUser && foundUser[0]) ?? "",
              lastName: (foundUser && foundUser[1]) ?? "",
              email: initEmail,
              rsvp: (foundUser && foundUser[3]) === "TRUE" ?? false,
            });
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUser();
  }, [contact.email, initEmail]);

  const setEditTrue = () => {
    setIsEditingContact(true);
  };

  return (
    <div className="banner-content">
      <NavigationMenu />
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
