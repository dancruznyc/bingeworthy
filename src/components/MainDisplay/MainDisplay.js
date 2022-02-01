import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./MainDisplay.css";
const apiKey = process.env.REACT_APP_API_KEY;

export default function MainDisplay(props) {
  const [trendingList, setTrendingList] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => {
        setTrendingList(res.results);
      });
  }, []);
  return (
    <div className="main-display-container">
      <div className="main-display-left">
        <div className="main-dispaly-left-subContainer">
          {props.moviesByGenre.map((movie) => (
            <div className="movie-img-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="main-display-right">
        <div className="trending-display">
          <h3 className="trending-title">Trending Now</h3>
          {trendingList.map((movie) => (
            <div className="movie-img-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
