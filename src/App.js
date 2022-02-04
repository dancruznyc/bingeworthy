import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Subcategories from "./components/Subcategories/Subcategories";
import MainDisplay from "./components/MainDisplay/MainDisplay";
import PlayMovieCard from "./components/PlayMovieCard/PlayMovieCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  console.log(apiKey);
  const [genres, setGenres] = useState([]);
  const [genreSelected, setGenreSelected] = useState("");
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [movieSelected, setMovieSelected] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => {
        setGenres(res.genres);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreSelected}`
    )
      .then((res) => res.json())
      .then((res) => {
        let arr = [...res.results, ...res.results.slice(0, 4)];
        setMoviesByGenre(arr);
      });
  }, [genreSelected]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovieSelected(
          res.results?.filter((movie) => movie.name.includes("Trailer"))[0] || {
            key: "",
          }
        );
      });
  }, [movieId]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Subcategories genres={genres} setGenreSelected={setGenreSelected} />
        <Routes>
          <Route
            path="/"
            element={
              <MainDisplay
                moviesByGenre={moviesByGenre}
                setMovieId={setMovieId}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={<PlayMovieCard movieSelected={movieSelected} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
