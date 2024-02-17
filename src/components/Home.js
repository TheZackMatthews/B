import React, { useEffect } from "react";
import { google } from "googleapis";
import Button from "@mui/material/Button";
import { JWT } from "google-auth-library";
import dotenv from "dotenv";
import "../App.css";
import NavigationMenu from "./NavigationMenu";
import { Link, useLocation } from "react-router-dom";

dotenv.config();

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const serviceAccountAuth = new JWT({
    email: credentials?.client_email,
    key: credentials?.private_key_id,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  useEffect(() => {
    async function fetchDataFromGoogleSheet() {
      try {
        // const sheets = google.sheets("v4");
        // sheets.spreadsheets.values.get(
        //   {
        //     auth: serviceAccountAuth,
        //     spreadsheetId: process.env.SHEET_ID,
        //     range: "A2:D99",
        //   },
        //   (err, res) => {
        //     if (err) {
        //       console.error("The API returned an error.");
        //       throw err;
        //     }
        //     const rows = res.data.values;
        //     if (rows.length === 0) {
        //       console.log("No data found.");
        //     } else {
        //       console.log("Name, RSVP:");
        //       for (const row of rows) {
        //         // Print columns A and D, which correspond to indices 0 and 3.
        //         console.log(`${row[0]}, ${row[3]}`);
        //       }
        //     }
        //   }
        // );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromGoogleSheet();
  });
    
  return (
    <div>
      <div className="banner-content">
        <NavigationMenu />
        <div style={{ height: "15vh" }}></div>
        <h1 className="Title">Zack & Lane</h1>
        <Link to={`/rsvp?email=${email}`}>
        <Button
            variant="contained"
            color="primary"
            size="large"
            className="edit-button"
            style={{ background: "#333" }}
          >RSVP Now</Button>
        </Link>
        <p className="banner-subtext">
          We are taking the next step in our adventure, and we can't wait to
          celebrate with you!
        </p>
        <div style={{ height: "45vh" }}></div>
      </div>
    </div>
  );
};

export default Home;
