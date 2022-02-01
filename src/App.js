import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Subcategories from "./components/Subcategories/Subcategories";
import MainDisplay from "./components/MainDisplay/MainDisplay";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  console.log(apiKey);
  const [genres, setGenres] = useState([]);
  const [genreSelected, setGenreSelected] = useState("");
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [movieId, setMovieId] = useState("");

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
        console.log(res.results);
        setMoviesByGenre(res.results);
      });
  }, [genreSelected]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setMovieId(res.results);
      });
  }, [movieId]);

  return (
    <div className="App">
      <Header />
      <Subcategories genres={genres} setGenreSelected={setGenreSelected} />
      <MainDisplay moviesByGenre={moviesByGenre} setMovieId={setMovieId} />
    </div>
  );
}

export default App;
