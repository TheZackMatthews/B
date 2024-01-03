import React from "react";
import NavigationMenu from "./NavigationMenu";

const Playlist = () => {
  return (
    <div className="banner-content">
      <NavigationMenu />
      Playlist
      <iframe
        title="Wedding playlist"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1EIgiz8Fu77U50?utm_source=generator"
        width="100%"
        height="650"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Playlist;
