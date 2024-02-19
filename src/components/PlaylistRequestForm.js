import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";

const PlaylistRequestForm = () => {
  const [requestHeading, setRequestHeading] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = (values, actions) => {
    // Handle form submission logic here
    console.log("Form submitted:", values);
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    selection: Yup.string().required("Selection is required"),
  });

  return (
    <div style={{ width: "90%" }}>
      <h1>Playlist Request Form</h1>
      <Formik
        initialValues={{
          selection: "",
          suggestion: suggestion,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(
          { isValid, errors, touched, handleChange, values } // Destructured values from Formik
        ) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "90%",
                border: "3px solid #333",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div style={{ margin: "5px 0" }}>
                <label htmlFor="selection">Selection:</label>
                <Field
                  as="select"
                  name="selection"
                  onChange={(e) => {
                    let message;
                    switch (e.target.value) {
                      case "collaborator":
                        message = "Contact (Email or Phone Number)";
                        break;
                      case "songSuggestion":
                        message = "Song and moment";
                        break;
                      case "generalSuggestion":
                        message = "Song (or artist)";
                        break;
                      default:
                        message = "";
                    }
                    setRequestHeading(message);
                    handleChange(e);
                  }}
                  style={{
                    width: "100%",
                    padding: "5px",
                  }}
                >
                  <option value="">Select an option</option>
                  <option value="collaborator">
                    I want to be added as a collaborator on this playlist
                  </option>
                  <option value="songSuggestion">
                    I have a suggestion for a song at a specific moment
                  </option>
                  <option value="generalSuggestion">
                    I have a general suggestion for the playlist
                  </option>
                </Field>
                {errors.selection && touched.selection && (
                  <div>{errors.selection}</div>
                )}
              </div>
              <div style={{ margin: "5px 0" }}>
                <label htmlFor="suggestion">
                  {requestHeading.length ? requestHeading : "Suggestion"}:
                </label>
                <TextField
                  id="suggestion"
                  name="suggestion"
                  multiline={requestHeading === "Song and moment"}
                  minRows={requestHeading !== "Song and moment" ? 1 : 4}
                  maxRows={8}
                  variant="outlined"
                  fullWidth
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  error={touched.suggestion && Boolean(errors.suggestion)}
                  helperText={touched.suggestion && errors.suggestion}
                  sx={{
                    background: "white",
                    "& input": {
                      padding: "5px",
                    },
                  }}
                />
              </div>
              {errors.suggestion && touched.suggestion && (
                <div>{errors.suggestion}</div>
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={!isValid || !values.selection || !suggestion}
                size="small"
                type="submit"
                className="edit-button"
                style={{
                  background:
                    isValid && values.selection && suggestion ? "#333" : "#ddd",
                  marginTop: "10px",
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlaylistRequestForm;
