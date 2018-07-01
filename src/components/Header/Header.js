import React from "react";
import "./Header.css";

export default () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>
          l<i class="fas fa-fire" />t
        </h1>
      </div>
      <div className="input">
        <input type="text" placeholder="Search Artist, Song, Genre..." />
      </div>
      <div className="user-login">
        <i class="fas fa-bell" />
        <i class="fas fa-user" />
        <button className="login-btn">Log In</button>
      </div>
    </div>
  );
};
