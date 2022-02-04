import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./MainDisplay.css";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { FiSlash } from "react-icons/fi";
import { FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
const apiKey = process.env.REACT_APP_API_KEY;

export default function MainDisplay(props) {
  const [trendingList, setTrendingList] = useState([]);
  const [mainDisplayPosition, setMainDisplayPosition] = useState(0);
  const [leftArrowActive, setLeftArrowActive] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => {
        setTrendingList(res.results);
      });
  }, []);

  function choseMovie(movieselected) {
    props.setMovieId(movieselected);
  }

  function moveMovieDisplay(direction) {
    if (direction === "right") {
      setMainDisplayPosition(mainDisplayPosition + 28);
      setLeftArrowActive(true);
    } else {
      setMainDisplayPosition(mainDisplayPosition - 28);
      if (mainDisplayPosition === 28) setLeftArrowActive(false);
    }
  }

  function updateArrow(displayPosition) {}
  return (
    <div className="main-display-container">
      <div className="main-display-arrow main-display-left-arrow">
        {leftArrowActive ? (
          <BsChevronCompactLeft onClick={() => moveMovieDisplay("left")} />
        ) : null}
      </div>
      <div className="main-display-left">
        <div
          className="main-dispaly-left-subContainer"
          style={{ left: `-${mainDisplayPosition}rem` }}
        >
          {(props.searchedMovies || props.moviesByGenre).map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <div className="movie-img-container">
                <img
                  key={movie.id}
                  onClick={() => choseMovie(movie.id)}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                />
                <div className="movie-caption">
                  <div className="movie-caption-title">
                    {movie.original_title}
                  </div>
                  <div className="movie-caption-icons">
                    <BsFillPlayCircleFill className="play-icon" />
                    <div className="movie-caption-small-icons">
                      <FiPlay />
                      <BsHeart />
                      <FiSlash />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="main-display-arrow main-display-right-arrow">
        <BsChevronCompactRight onClick={() => moveMovieDisplay("right")} />
      </div>
      <div className="main-display-right">
        <div className="trending-display">
          <h3 className="trending-title">Trending Now</h3>
          {trendingList.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <div className="movie-img-container">
                <img
                  onClick={() => choseMovie(movie.id)}
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                />
                <div className="movie-caption">
                  <div className="movie-caption-title">
                    {movie.original_title}
                  </div>
                  <div className="movie-caption-icons">
                    <BsFillPlayCircleFill className="play-icon" />
                    <div className="movie-caption-small-icons">
                      <FiPlay />
                      <BsHeart />
                      <FiSlash />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
