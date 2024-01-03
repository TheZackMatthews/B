// NavigationMenu.js

import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/rsvp">RSVP</Link>
        </li>
        <li>
          <Link to="/location">Location</Link>
        </li>
        <li>
          <Link to="/schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/registry">Registry</Link>
        </li>
        <li>
          <Link to="/playlist">Playlist</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
