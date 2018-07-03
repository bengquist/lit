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
        <input type="text" placeholder="Search Artist, Song, Genre..." />
      </div>
      <div className="user-login">
        <i className="fas fa-bell" />
        <i className="fas fa-user" />
        <button className="login-btn">
          <a href="http://localhost:8888">Log In</a>
        </button>
      </div>
    </div>
  );
};
