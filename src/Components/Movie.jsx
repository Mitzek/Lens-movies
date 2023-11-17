import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useEffect } from "react";

function Movie() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const { state } = useLocation();
  const { name, originalName, title, desc, banner } = state;

  console.log(state);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const videoStyle = {};

  function turncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "83%";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);

  const handleClick = (state) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(state?.title || state?.name || state?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <header
      className="header"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original${banner}"
      )`,
        backgroundPosition: "top",
      }}
    >
      <div className="header_contents">
        <h3 className="header_title">{name || originalName || title} </h3>
        <div className="header_buttons">
          <button
            className="header_button"
            onClick={() => {
              handleClick(state);
            }}
          >
            Play Trailer
          </button>
        </div>
      </div>
      <h1 className="header_desc">{turncate(desc, 400)}</h1>
      {trailerUrl && (
        <Youtube videoId={trailerUrl} opts={opts} style={videoStyle} />
      )}
    </header>
  );
}

export default Movie;
