import React, { useState, useEffect } from "react";
import "./Subcategories.css";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
const apiKey = process.env.REACT_APP_API_KEY;

export default function Subcategories(props) {
  const [userSelected, setUserSelected] = useState([]);
  const [genrePosition, setGenrePosition] = useState(0);
  const [catLeftArrowActive, setCatLeftArrowActive] = useState(false);
  const [catRightArrowActive, setCatRightArrowActive] = useState(true);
  let navigate = useNavigate();
  if (!props.isActive) props.setIsActive("Action");
  function searchMovie(e) {
    navigate("/");
    props.setSearchQuery(e.target.value);
  }

  function choseGenre(id, name) {
    props.setIsActive(name);
    props.setSearchedMovies(null);
    props.setGenreSelected(id);
  }

  function moveCats(direction) {
    if (direction === "right") {
      setGenrePosition(genrePosition + 10);
      setCatLeftArrowActive(true);
      if (genrePosition === 140) setCatRightArrowActive(false);
    } else {
      setGenrePosition(genrePosition - 10);
      if (genrePosition === 10) setCatLeftArrowActive(false);
      if (genrePosition <= 150) setCatRightArrowActive(true);
    }
  }
  return (
    <div className="subcategories-container">
      <div className="subcategories">
        <div className="cat-left-arrow-container">
          {catLeftArrowActive ? (
            <BsChevronCompactLeft
              className="cat-left"
              onClick={() => moveCats("left")}
            />
          ) : null}
        </div>
        <div className="subcat-list-container">
          <div
            className="subcategories-list"
            style={{ left: `-${genrePosition}rem` }}
          >
            {props.genres.map((genre) => {
              return (
                <Link to="/" className="subcat-btn">
                  <div
                    className={props.isActive === genre.name ? "active" : ""}
                    key={genre.id}
                    onClick={() => choseGenre(genre.id, genre.name)}
                  >
                    {genre.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="cat-right-arrow-container">
          {catRightArrowActive ? (
            <BsChevronCompactRight
              className="cat-right"
              onClick={() => moveCats("right")}
            />
          ) : null}
        </div>
      </div>
      <div className="search-container">
        <input
          onChange={(e) => searchMovie(e)}
          type="text"
          placeholder="Search Movies"
          className="search-bar"
        ></input>
        <BiSearchAlt className="search-icon" />
      </div>
    </div>
  );
}
