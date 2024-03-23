import React, { useState } from "react";
import NavigationMenu from "./NavigationMenu";
import PlaylistRequestForm from "./PlaylistRequestForm";
import { Skeleton } from "@mui/material";

const Playlist = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="banner-content">
      <NavigationMenu />
      {<iframe
        title="Wedding playlist"
        className="spotify-embed"
        src="https://open.spotify.com/embed/playlist/4Ibwvgr9QjTyHGr5YXduwP?utm_source=generator&theme=0"
        onLoad={() => setIframeLoaded(true)}
        width="90%"
        height={iframeLoaded ? "650px" : "0px"}
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>}
        {!iframeLoaded && <Skeleton variant="rectangular" width="90%" height="630px" />
      }
      <PlaylistRequestForm />
    </div>
  );
};

export default Playlist;
