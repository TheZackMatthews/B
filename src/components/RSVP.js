import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { ErrorMessage, Formik, Field, Form } from "formik";
import NavigationMenu from "./NavigationMenu";
import Contact from "./Contact";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const RSVP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const unfilteredEmail = queryParams.get("email");
  const initEmail = (unfilteredEmail === 'null' ? '' : unfilteredEmail);

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [{ firstName, lastName, email, rsvp }, setContact] = useState({
    firstName: "",
    lastName: "",
    email: initEmail,
    rsvp: false,
  });

  console.log(initEmail);

  const toggleRSVP = () => {
    setContact({ ...{ firstName, lastName, email }, rsvp: !rsvp });
  };

  const setEditTrue = () => {
    setIsEditingContact(true);
  };

  return (
    <div className="banner-content">
      <NavigationMenu />
      {!isEditingContact && (
        <Contact
          firstName={firstName}
          lastName={lastName}
          email={email}
          rsvp={rsvp}
          toggleRSVP={toggleRSVP}
          setEdit={setEditTrue}
        />
      )}
      {isEditingContact && (
        <div
          style={{
            border: "3px solid #333",
            background: rsvp ? "#008000" : "#800020",
            borderRadius: "10px",
            padding: "10px",
            margin: "5vh 0",
          }}
        >
          <h2>RSVP Now</h2>
          <Formik
            initialValues={{
              firstName: firstName,
              lastName: lastName,
              email: email,
            }}
            validationSchema={validationSchema} // Add validation schema
            onSubmit={async (values) => {
              setIsEditingContact(false);
              setContact({ ...values, rsvp });
              // Update the search property of the location
              
              queryParams.set("email", values.email);
              const newUrl = `${window.location.pathname
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
                <Field name="firstName" type="text" placeholder={firstName} />
                <ErrorMessage name="firstName" component="div" />

                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" component="div" />

                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
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
