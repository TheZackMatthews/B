import React from "react";
import NavigationMenu from "./NavigationMenu";

// TODO: Add a form at the bottom to request songs be added
const Playlist = () => {
  return (
    <div className="banner-content">
      <NavigationMenu />
      Playlist
      <iframe
        title="Wedding playlist"
        className="spotify-embed"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1EIgiz8Fu77U50?utm_source=generator"
        width="90%"
        height="650"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Playlist;
