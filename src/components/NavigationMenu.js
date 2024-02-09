// NavigationMenu.js

import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

const NavigationMenu = () => {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search); // Access specific query parameters
  const name = queryParams.get("name");


  const renderNavItem = (label, path, dropdown = null) => {
    return <li key={label}>
        <Link to={`/${path}?name=${name}`}>{label}</Link>
      </li>;
  };

  return (
    <nav>
      <ul>
        {renderNavItem("Home", "")}
        {renderNavItem("Location & Travel", "location")}
        {renderNavItem("FAQ", "faq")}
        {renderNavItem("Playlist", "playlist")}
        {renderNavItem("Registry", "registry")}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
