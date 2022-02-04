import React, { useState } from "react";
import "./PlayMovieCard.css";

export default function PlayMovieCard(props) {
  if (!props.movieSelected) {
    const movieURL = document.location.href;
    props.setMovieId(movieURL.slice(movieURL.lastIndexOf("/") + 1));
  }
  //  setMovieUrl(props.movieSelected.key ? props.movieSelected.key : document.location.href)
  return (
    <div className="movie-trailer">
      <iframe
        src={`https://www.youtube.com/embed/${props.movieSelected?.key}`}
        width="640"
        height="360"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
