import React, { useEffect } from "react";
import NavigationMenu from "./NavigationMenu";

const FAQ = () => {
  useEffect(() => {
    // Check if the URL contains a hash (e.g., #what-to-wear)
    const hash = window.location.hash;
    if (hash) {
      // Scroll to the corresponding element with the ID
      const element = document.getElementById(hash.substring(1).split("?")[0]);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="banner-content">
      <NavigationMenu />
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-question">
          <h2 id="what-to-wear">What should I wear?</h2>
          <p>Answer to the question "What should I wear?" goes here.</p>
        </div>
        <div className="faq-question">
          <h2 id="arrival-time">When should I arrive?</h2>
          <p>Answer to the question "When should I arrive?" goes here.</p>
        </div>
        <div className="faq-question">
          <h2 id="departure-time">What time does the reception end?</h2>
          <p>
            Answer to the question "What time does the reception end?" goes
            here.
          </p>
        </div>
        <div className="faq-question">
          <h2 id="house-rules">Are there any house rules?</h2>
          <p>Answer to the question "Are there any house rules?" goes here.</p>
        </div>
        <div className="faq-question">
          <h2 id="ceremony-rules">Can I take photos during the ceremony?</h2>
          <p>
            Answer to the question "Can I take photos during the ceremony?" goes
            here.
          </p>
        </div>
        <div className="faq-question">
          <h2 id="rsvp">How do I RSVP?</h2>
          <p>Answer to the question "How do I RSVP?" goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
