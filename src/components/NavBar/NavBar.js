import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>
            l
            <i className="fas fa-fire" />
            t
          </h1>
        </Link>
      </div>
      <div className="header">
        <Link to="/profile">
          <img
            className="profile_img"
            src={props.profileImg}
            alt="Profile Img"
          />
        </Link>
      </div>
      <div className="links">
        <Link to="/">
          <i class="fas fa-sliders-h" /> Timeline
        </Link>
      </div>
      <div className="links">
        <Link to="/discover">
          <i class="fas fa-globe" /> Discover
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
