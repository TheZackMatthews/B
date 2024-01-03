import React from "react";
import NavigationMenu from "./NavigationMenu";
import { useLocation } from "react-router-dom";

const RSVP = () => {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);

// Access specific query parameters
const name = queryParams.get("name");

  return (
    <div className="banner-content">
      <NavigationMenu />
      <p>RSVP, {name}</p>
    </div>
  );
};

export default RSVP;
