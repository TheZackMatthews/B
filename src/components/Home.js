import React from "react";
import Button from "@mui/material/Button";
import "../App.css";
import NavigationMenu from "./NavigationMenu";
import { Link, useLocation } from "react-router-dom";


const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
    
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
