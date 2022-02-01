import React, { useState, useEffect } from "react";
import "./Subcategories.css";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
const apiKey = process.env.REACT_APP_API_KEY;

export default function Subcategories(props) {
  const [userSelected, setUserSelected] = useState([]);

  function choseGenre(id) {
    props.setGenreSelected(id);
  }
  let position = 0;
  function moveCats(direction) {
    console.log(position);
    const catList = document.querySelector(".subcategories-list");
    // console.log(catList);
    // console.log(catList.style.left);
    if (direction === "right") {
      position += 10;
      catList.style.left = `-${position}rem`;
    } else {
      position -= 10;
      catList.style.left = `-${position}rem`;
    }
  }
  return (
    <div className="subcategories-container">
      <div className="subcategories">
        <div>
          <BsChevronCompactLeft
            className="cat-left"
            onClick={() => moveCats("left")}
          />
        </div>
        <div className="subcat-list-container">
          <div className="subcategories-list">
            {props.genres.map((genre) => {
              return (
                <div
                  className="subcat-btn"
                  key={genre.id}
                  onClick={() => choseGenre(genre.id)}
                >
                  {genre.name}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <BsChevronCompactRight
            className="cat-right"
            onClick={() => moveCats("right")}
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Movies"
        className="search-bar"
      ></input>
    </div>
  );
}
