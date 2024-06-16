import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import NavigationMenu from "./NavigationMenu";
import Collapse from "@mui/material/Collapse";

const FAQ = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [expandedItems, setExpandedItems] = useState({});

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

  const handleItemClick = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId],
    }));
  };

  return (
    <div className="banner-content">
      <NavigationMenu />
      <div style={{ height: "15vh" }}></div>
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-question">
          <h2 id="what-to-wear" onClick={() => handleItemClick("what-to-wear")}>
            Q: Is there a dress code for this event?
          </h2>
          <Collapse
            in={expandedItems["what-to-wear"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              We'd love for you to join us in your best dressy casual or
              cocktail attire. While we're not specifying black-tie, we do hope
              you'll dress to impress. For gentlemen, a sharp dress shirt and
              tie paired with dress pants or slacks would be perfect. Ladies,
              feel free to opt for a stylish dress or dressy separates. We want
              everyone to feel comfortable and stylish, so feel free to add your
              personal flair to your outfit. If you have any questions about the
              dress code or need suggestions, don't hesitate to reach out. We're
              looking forward to celebrating with you!
            </p>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2 id="how-to-park" onClick={() => handleItemClick("how-to-park")}>
            Q: How do I park when I arrive?
          </h2>
          <Collapse
            in={expandedItems["how-to-park"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              Parking at our venue is hassle-free! We're excited to offer valet
              parking service to all our guests upon arrival. Simply drive up to
              the venue entrance, and our friendly valet attendants will take
              care of parking your vehicle for you.
            </p>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2
            id="reception-end-time"
            onClick={() => handleItemClick("reception-end-time")}
          >
            Q: What time does the reception end?
          </h2>
          <Collapse
            in={expandedItems["reception-end-time"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              The reception will end at 10:00 PM. Dinner will be served between
              5:00 and 6:00 PM.
            </p>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2 id="house-rules" onClick={() => handleItemClick("house-rules")}>
            Q: Are there any house rules?
          </h2>
          <Collapse
            in={expandedItems["house-rules"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              Yes, the venue Pine Rivers Ranch has a smoking policy we'd like
              you to follow:
            </p>
            <p>
              <b>Smoking Policy</b>: Smoking is prohibited on the premises
              except in the designated smoking area located in the main parking
              lot in front of the main house. We kindly ask all guests to adhere
              to this policy to maintain a clean and safe environment.
            </p>
            <p>
              <b>Marijuana Use</b>: The use of marijuana on the premises is
              strictly prohibited. Any guests found using marijuana may be asked
              to leave by our staff. We appreciate your cooperation in
              respecting this rule. We thank you for your understanding and
              cooperation in following these house rules. If you have any
              questions or need clarification, please feel free to reach out to
              us.
            </p>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2
            id="ceremony-photo-rule"
            onClick={() => handleItemClick("ceremony-photo-rule")}
          >
            Q: Can I take photos during the ceremony?
          </h2>
          <Collapse
            in={expandedItems["ceremony-photo-rule"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              We request that guests refrain from taking photos during the
              ceremony. Our professional photographer will be capturing all the
              precious moments, allowing you to fully immerse yourself in the
              experience.
            </p>
            <p>
              However, we encourage you to take photos before the ceremony and
              during the reception. Feel free to snap away and capture memories
              with friends and family during these times. We want everyone to
              enjoy the celebration to the fullest, and your personal photos
              will complement the professional shots beautifully.
            </p>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2 id="how-to-rsvp" onClick={() => handleItemClick("how-to-rsvp")}>
            Q: How do I RSVP?
          </h2>
          <Collapse
            in={expandedItems["how-to-rsvp"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              Navigate to our RSVP page, and simply check the checkbox. When
              you're good to go, the background will change to green. For help
              manually updating or verifying RSVP status, reach out to Zack.
            </p>
            <Link to={`/rsvp?email=${email}`}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="edit-button"
                style={{ background: "#333" }}
              >
                RSVP Now
              </Button>
            </Link>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2
            id="playlist-contribution"
            onClick={() => handleItemClick("playlist-contribution")}
          >
            Q: Can I contribute to the wedding playlist or suggest songs for
            specific moments?
          </h2>
          <Collapse
            in={expandedItems["playlist-contribution"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              Absolutely! We would love for you to be a part of creating the
              soundtrack for our special day. You can contribute to our wedding
              playlist by becoming a collaborator on our Spotify playlist for
              the reception. Simply use the form on our playlist page to request
              access as a collaborator.
            </p>
            <p>
              If you don't have a Spotify account or prefer not to use it, you
              can still participate by submitting your song suggestions using
              the form on our playlist page. We welcome your input and
              appreciate your contribution to making our celebration even more
              memorable with your favorite tunes.
            </p>
            <p>
              Thank you for being a part of our wedding journey and helping us
              create a playlist that reflects our love and joy. If you have any
              specific song requests or questions, please don't hesitate to
              reach out to us.
            </p>
          </Collapse>
        </div>
        <div className="faq-question">
          <h2 id="what-if-rain" onClick={() => handleItemClick("what-if-rain")}>
            Q: Is there a rain plan in case of inclement weather for outdoor
            events
          </h2>
          <Collapse
            in={expandedItems["what-if-rain"]}
            timeout="auto"
            unmountOnExit
          >
            <p>
              While we're keeping our fingers crossed for perfect weather on our
              special day, we do have a contingency plan in place in case of
              inclement weather. If serious rain or heavy smoke threatens the
              event, we'll move the celebration indoors to the upstairs of the
              barn at Pine Rivers Ranch.
            </p>
            <p>
              In the event of light rain, we've seen parties at this venue
              complete their ceremonies outdoors with the use of umbrellas,
              adding a unique and charming touch to the occasion. We recommend
              checking the forecast the week of the event for any updates or
              changes to our plans.
            </p>
            <p>
              Rest assured, we're prepared to ensure that our celebration goes
              smoothly regardless of the weather. Your safety and comfort are
              our top priorities, and we'll do everything we can to make sure
              you have a wonderful experience.
            </p>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
