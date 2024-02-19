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
  const [googleSheetIndex, setGoogleSheetIndex] = useState(0);
  const [isEditingContact, setIsEditingContact] = useState(false);
  let sheetContact = {
    firstName: "",
    lastName: "",
    email: initEmail,
    rsvp: false,
  };
  const [contact, setContact] = useState(sheetContact);

  const setSpreadsheetValue = async (newValue) => {
    // const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    // const payload = {
    //   iss: credentials.client_email,
    //   sub: credentials.client_email,
    //   aud: "https://sheets.googleapis.com/", // Audience should be the API endpoint
    //   exp: Math.floor(Date.now() / 1000) + 3600, // Token expiration time (1 hour)
    //   iat: Math.floor(Date.now() / 1000),
    // };

    // const privateKey = credentials.private_key;
    // const signedJWT = jwt?.sign(payload, privateKey, { algorithm: "RS256" });

    // const RANGE = `Sheet1!A${googleSheetIndex}:D${googleSheetIndex}`; // Update columns A-D
    // const queryURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/${RANGE}?valueInputOption=RAW`;

    // Request body containing the data to append
    const requestBody = {
      values: [
        [contact.firstName, contact.lastName, contact.email, contact.rsvp],
      ],
    };

    try {
      // const response = await axios.post(queryURL, { 
      //   Authorization: signedJWT, 
      //   data: JSON.stringify(requestBody) 
      // });

      // console.log(response);
      // if (!response.ok) {
      //   throw new Error("Failed to update spreadsheet");
      // }

    } catch (error) {
    console.error('Error updating spreadsheet:', error);
  }
  };

  useEffect(() => {
    async function fetchDataFromGoogleSheet() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet1!A2:D99?key=${process.env.GOOGLE_API_KEY}`
        );

        // Parse response as JSON
        const rows = (await response.json())?.values;
        
        const currentContactIndex = rows?.findIndex(
          (row) => row[2] === contact?.email
        );
        setGoogleSheetIndex(() => currentContactIndex);
        const matchedRow = rows[currentContactIndex];

        setContact({
          firstName: (matchedRow && matchedRow[0]) ?? "",
          lastName: (matchedRow && matchedRow[1]) ?? "",
          email: initEmail,
          rsvp: (matchedRow && matchedRow[3]) === "TRUE" ?? false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromGoogleSheet();
  }, [contact.email, googleSheetIndex, initEmail]);

  const toggleRSVP = () => {
    setContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      rsvp: !contact.rsvp,
    });
  };

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
          toggleRSVP={toggleRSVP}
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

              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
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
