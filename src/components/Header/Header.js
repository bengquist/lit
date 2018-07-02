import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>
          l<i className="fas fa-fire" />t
        </h1>
      </div>
      <div className="input">
        <input type="text" placeholder="Search Artist, Song, Genre..." />
      </div>
      <div className="user-login">
        <i className="fas fa-bell" />
        <i className="fas fa-user" />
        <Link to="/">
          <button className="login-btn">Log In</button>
        </Link>
      </div>
    </div>
  );
};
