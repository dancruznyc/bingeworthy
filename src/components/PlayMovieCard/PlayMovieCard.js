import React, { useState } from "react";
import "./PlayMovieCard.css";

export default function PlayMovieCard(props) {
  console.log(props);
  return (
    <div className="movie-trailer">
      <iframe
        src={`https://www.youtube.com/embed/${props.movieSelected.key}`}
        width="640"
        height="360"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
