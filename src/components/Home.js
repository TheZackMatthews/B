import React from "react";
import "../App.css";
import NavigationMenu from "./NavigationMenu";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access specific query parameters
  const name = queryParams.get("name");

  return (
    <div>
      <div className="banner-content">
      <NavigationMenu />
      <h1 className="Title">Zack & Lane</h1>
        <Link to={`/rsvp?name=${name}`} className="btn">
          RSVP Now
        </Link>
      <p className="banner-subtext">
        We are taking the next step of our adventure, and we can't wait to
        celebrate with you
      </p>
      </div>
    </div>
  );
};

export default Home;
