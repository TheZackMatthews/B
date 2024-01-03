import React from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

const FaqDropdown = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access specific query parameters
  const name = queryParams.get("name");
  return (
    <div className="faq-dropdown">
      <Link to={`/faq#what-to-wear?name=${name}`}>What should I wear?</Link>
      <Link to={`/faq#arrival-time?name=${name}`}>When should I arrive?</Link>
      <Link to={`/faq#departure-time?name=${name}`}>
        What time does the reception end?
      </Link>
      <Link to={`/faq#house-rules?name=${name}`}>
        Are there any house rules?
      </Link>
      <Link to={`/faq#ceremony-rules?name=${name}`}>
        Can I take photos during the ceremony?
      </Link>
      <Link to={`/faq#rsvp?name=${name}`}>How do I RSVP?</Link>
    </div>
  );
};

export default FaqDropdown;