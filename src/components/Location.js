import React, { useState } from "react";
import NavigationMenu from "./NavigationMenu";

const Location = () => {
  const [selectedTravelMethod, setSelectedTravelMethod] = useState(null);
  return (
    <div className="banner-content banner-content-travel">
      <NavigationMenu />
      <div style={{ height: "5vh" }}></div>
      <div style={{ width: "80vw" }}>
        <div>
          <ul className="nav-tabs" role="tablist">
            <li
              role="presentation"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedTravelMethod(
                  selectedTravelMethod === "car" ? null : "car"
                )
              }
            >
              <div role="tab" id="bycar" tabIndex="1">
                <p>By Car</p>
              </div>
            </li>
            <li
              role="presentation"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedTravelMethod(
                  selectedTravelMethod === "bus" ? null : "bus"
                )
              }
            >
              <div role="tab" id="bybus" tabIndex="2">
                <p>By Bus</p>
              </div>
            </li>
            <li
              role="presentation"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedTravelMethod(
                  selectedTravelMethod === "train" ? null : "train"
                )
              }
            >
              <div role="tab" id="bytrain" tabIndex="3">
                <p>By Train</p>
              </div>
            </li>
            <li
              role="presentation"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedTravelMethod(
                  selectedTravelMethod === "air" ? null : "air"
                )
              }
            >
              <div role="tab" id="byair" tabIndex="4">
                <p>By Air</p>
              </div>
            </li>
          </ul>
        </div>
        <div
          className={`tab-content ${
            selectedTravelMethod !== null ? "expanded" : ""
          }`}
        >
          {selectedTravelMethod === "car" && (
            <div
              className="tab-expanding"
              role="tabpanel"
              tabIndex="0"
              id="tab-0ab50549a85a254a1db"
              style={{ minHeight: "278.7px", color: "#fff" }}
            >
              <p>By Car</p>
              <p>
                Leavenworth is easily accessible from the west coast via US
                Highway 2, and the drive through the Cascades has been voted as
                one of the most scenic drives in the States. The highway is well
                maintained with frequent pull-outs and rest stops to soak in the
                scenery or grab a bite. In the winter, the roads are kept clear,
                though you will want to check the road reports&nbsp;
                <a href="https://www.wsdot.com/traffic/passes/">here</a>
                &nbsp;before heading out.&nbsp;Here are some links to some
                useful Google Maps:
              </p>
              <ul>
                <li>
                  <a href="https://www.google.com/maps/dir/Bellingham,+WA/Leavenworth,+Washington+98826/@47.9634188,-121.521227,8z/data=!4m8!4m7!1m2!1m1!1s0x5485962ef2458717:0xd57a9ca9cd39e0f0!1m2!1m1!1s0x549a4d92a4f8f98d:0xa14f95fb0abfef7e!3e0?hl=en&source=embed">
                    <strong>From Bellingham, WA</strong>
                  </a>
                </li>
                <li>
                  <a href="https://maps.google.com/maps?f=d&amp;hl=en&amp;geocode=&amp;time=&amp;date=&amp;ttype=&amp;saddr=seattle&amp;daddr=leavenworth,+wa&amp;sll=47.372315,-119.036865&amp;sspn=2.574379,3.702393&amp;ie=UTF8&amp;om=1&amp;ll=47.38954,-121.446385&amp;spn=0.42922,1.76673&amp;source=embed">
                    <strong>From Seattle, WA</strong>
                  </a>
                </li>
                <li>
                  <a href="https://maps.google.com/maps?f=d&amp;hl=en&amp;geocode=&amp;time=&amp;date=&amp;ttype=&amp;saddr=spokane&amp;daddr=leavenworth,+wa&amp;sll=46.555083,-121.78894&amp;sspn=2.613995,3.702393&amp;ie=UTF8&amp;ll=46.55886,-121.777954&amp;spn=0.57288,3.24722&amp;om=1&amp;source=embed">
                    <strong>From Spokane, WA</strong>
                  </a>
                </li>
              </ul>
            </div>
          )}
          {selectedTravelMethod === "bus" && (
            <div
              className="tab-expanding"
              role="tabpanel"
              tabIndex="0"
              id="tab-b5ae081aece079d93ef"
              style={{ minHeight: "278.7px", color: "#fff" }}
            >
              <p>By Bus</p>
              <p>
                <a href="http://www.northwesterntrailways.com/">
                  <strong>Northwestern Trailways</strong>
                </a>
                &nbsp;daily bus service directly to Leavenworth. 1-800-366-3830
              </p>
              <p>
                <strong>Bus Tours&nbsp;</strong>
              </p>
              <ul>
                <li>Customized Tours &amp; Charter Service 206-878-3965</li>
                <li>Pacific Alaska Tours 206-937-2010</li>
                <li>NW Adventure Tours 425-445-1514</li>
                <li>Sound Excursions 206-486-6002</li>
              </ul>
              <p>
                <strong>Shuttle</strong>
              </p>
              <ul>
                <li>
                  <a href="https://www.leavenworthshuttle.com/">
                    <strong>Leavenworth Shuttle &amp; Taxi</strong>
                  </a>{" "}
                  509-548-7433
                </li>
                <li>
                  <a href="https://www.wenatcheevalleyshuttle.com/">
                    <strong>Wenatchee Valley Shuttle</strong>
                  </a>{" "}
                  509-293-5773
                </li>
              </ul>
              <p>
                <strong>Public Transportation</strong>
              </p>
              <p>
                <a href="https://www.linktransit.com/">
                  <strong>Link Transit</strong>
                </a>
                &nbsp;serves Chelan and Douglas Counties and provides safe,
                reliable, and cost effective public transportation services that
                promote citizen access to work, recreation, commerce and public
                services.
              </p>
              <ul>
                <li>
                  <a
                    href="http://www.linktransit.com/routes_and_schedules/intercity_routes/route_22_wenatchee_to_leavenworth.php"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>Route 22</strong>
                  </a>
                  &nbsp;– Wenatchee to Leavenworth
                </li>
                <li>
                  <a
                    href="http://www.linktransit.com/routes_and_schedules/intercity_routes/route_22_wenatchee_to_leavenworth.php"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>Route 22</strong>
                  </a>
                  &nbsp;– Leavenworth to Wenatchee
                </li>
                <li>
                  Link Guest&nbsp;<strong>Service Center</strong>
                  &nbsp;509-662-1155
                </li>
              </ul>
            </div>
          )}
          {selectedTravelMethod === "train" && (
            <div
              className="tab-expanding"
              role="tabpanel"
              tabIndex="0"
              id="tab-4514483b40e67dfd672"
              style={{ minHeight: "278.7px", color: "#fff" }}
            >
              <p style={{ lineHeight: "1.3" }}>By Train</p>
              <ul>
                <li>
                  <strong>Amtrak Train No. 7: Departs 6:08 AM</strong>
                  &nbsp;–&nbsp;Westbound (from Chicago) to Seattle and all
                  intermediate stations
                </li>
                <li>
                  <strong>Amtrak Train No. 8: Departs 4:40 PM</strong>
                  &nbsp;–&nbsp;Eastbound (from Seattle) to Chicago and all
                  intermediate stations
                </li>
              </ul>
              <p>
                For Train status&nbsp;please call (800) 872-7245 –
                (1.800.USA.RAIL)
              </p>
              <p>For Train Ticket purchases:</p>
              <ul>
                <li>
                  Icicle Station is an un-staffed station and does not have a
                  quik-trak machine at this time.&nbsp; Tickets can be purchased
                  via a number of ways:
                </li>
                <li>
                  Reservations can be made via phone (1.800.872.7245) or on the
                  web&nbsp;
                  <a href="https://www.amtrak.com/">www.amtrak.com</a>
                </li>
                <li>
                  Icicle Station Shuttle Service provided by Leavenworth Shuttle
                  (877) 868-7720 or (509) 548-7433
                </li>
              </ul>
            </div>
          )}
          {selectedTravelMethod === "air" && (
            <div
              className="tab-expanding"
              role="tabpanel"
              tabIndex="0"
              id="tab-b135b19092a4ac29aa2"
              style={{ minHeight: "278.7px", color: "#fff" }}
            >
              <p>By Air</p>
              <p>
                <a href="https://www.portseattle.org/sea-tac">
                  <strong>Sea-Tac International Airport</strong>
                </a>{" "}
                is located 130 miles from Leavenworth. As the largest
                international airport in the Pacific Northwest, Sea-Tac is
                easily accessed from anywhere in the world.
              </p>
              <p>
                <a
                  href="https://www.flywenatchee.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>Pangborn Memorial Airport</strong>
                </a>{" "}
                in East Wenatchee (Airport code EAT) is located 30 miles from
                Leavenworth. Horizon Air provides six direct flights per day
                from Seattle to E. Wenatchee and three direct flights per day
                from E. Wenatchee to Seattle. Call 1-800-547-9308 for
                reservations. You can also check out their new webcam for
                current conditions.
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ height: "5vh" }}></div>

      <h3>Getting to Pine Rivers Ranch </h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2681.206558720723!2d-120.71566258443694!3d47.77744258415387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549b00663132b9d9%3A0x9f420f7253b536a!2sPine%20River%20Ranch%20Bed%20%26%20Breakfast%20and%20Wedding%20Destination!5e0!3m2!1sen!2sus!4v1644435394679!5m2!1sen!2sus"
        width="90%"
        height="450"
        title="PRR Location"
        allowFullScreen=""
        loading="lazy"
      ></iframe>

      <h3>Lodging</h3>
      <a
        href="https://leavenworth.org/lodging-results/hotels-motels/"
        target="_blank"
        rel="noreferrer"
        className="btn"
      >
        Leavenworth Hotel Results
      </a>
      <div style={{ height: "5vh" }}></div>
    </div>
  );
};

export default Location;
