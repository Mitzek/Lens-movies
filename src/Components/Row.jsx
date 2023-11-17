import instance from "../services/axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const navigate = useNavigate();
  const handleClick = (movie) => {
    navigate("/view-movie", {
      state: {
        name: movie.name,
        originalName: movie.original_name,
        title: movie.title,
        desc: movie.overview,
        banner: movie.backdrop_path,
        baseUrl: baseUrl,
      },
    });
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <>
              <img
                key={movie.id}
                onClick={() => {
                  handleClick(movie);
                }}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${baseUrl}${movie.poster_path}`}
                alt={movie.name}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
