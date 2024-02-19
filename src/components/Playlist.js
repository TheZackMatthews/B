import React from "react";
import NavigationMenu from "./NavigationMenu";
import PlaylistRequestForm from "./PlaylistRequestForm";

// TODO: Add a form at the bottom to request songs be added
const Playlist = () => {
  return (
    <div className="banner-content">
      <NavigationMenu />
      <iframe
        title="Wedding playlist"
        className="spotify-embed"
        src="https://open.spotify.com/embed/playlist/4Ibwvgr9QjTyHGr5YXduwP?utm_source=generator&theme=0"
        width="90%"
        height="650"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <PlaylistRequestForm />
    </div>
  );
};

export default Playlist;
