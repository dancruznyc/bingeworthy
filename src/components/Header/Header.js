import React, { useState } from "react";
import couchLogo from "../../assets/couchlogo.svg";
import "./Header.css";

export default function Header() {
  const [media, setMedia] = useState("");
  return (
    <div className="header-container">
      <div className="logo-container">
        <div className="logo-img">
          <img src={couchLogo} className="header-logo" />
        </div>
        <p className="logo-par">
          <span className="logo-highlight">B</span>inge
          <span className="logo-highlight">W</span>orthy
        </p>
      </div>
      <div className="header-categories">
        <div>Movies</div>
        <div>TV Series</div>
      </div>
      <div className="header-icons">
        <a>X</a>
        <a>X</a>
        <div className="header-login">
          <p>login</p>
        </div>
      </div>
    </div>
  );
}
