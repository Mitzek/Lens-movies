import React, { useState, useEfect } from "react";
import { useEffect } from "react";
import instance from "../services/axios";
import requests from "../services/requests";

import { useNavigate, useLocation } from "react-router-dom";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function getData() {
      const request = await instance.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    getData();
  }, []);

  function turncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const navigate = useNavigate();
  const handleClick = (movie) => {
    navigate("/view-movie", {
      state: {
        name: movie.name,
        originalName: movie.original_name,
        title: movie.title,
        desc: movie.overview,
        banner: movie.backdrop_path,
      },
    });
  };

  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "top",
      }}
    >
      <div className="banner_contents">
        <h3 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}{" "}
        </h3>
        <div className="banner_buttons">
          <button
            className="banner_button"
            onClick={() => {
              handleClick(movie);
            }}
          >
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_desc">{turncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fade_bottom" />
    </header>
  );
}

export default Banner;
