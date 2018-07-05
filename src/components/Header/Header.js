import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

export default () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h1>
            l<i className="fas fa-fire" />t
          </h1>
        </Link>
      </div>
      <div className="input">
        <input
          className="search"
          type="text"
          placeholder="Search Artist, Song, Genre..."
        />
        <select name="type" id="type">
          <option value="artist">Artist</option>
          <option value="song">Song</option>
          <option value="Album">Album</option>
        </select>
      </div>
      <div className="user-login">
        <i className="fas fa-bell" />
        <i className="fas fa-user" />
        <Link to="/login">
          <button className="login-btn">
            <p>Log In</p>
          </button>
        </Link>
        <Link to="/signup">
          <button className="login-btn">
            <p>Sign Up</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
