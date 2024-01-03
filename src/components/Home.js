import React from "react";
import "../App.css";
import NavigationMenu from "./NavigationMenu";

const Home = () => {
  return (
    <div>
      <NavigationMenu />
      <h1>Welcome to the Home Page</h1>
      <button>RSVP</button>
    </div>
  );
};

export default Home;
