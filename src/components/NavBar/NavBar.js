import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/home/">
          <h1>
            l<i className="fas fa-fire" />t
          </h1>
        </Link>
      </div>
      <div className="header">
        <Link to="/home/profile">
          <img
            className="profile_img"
            src={props.profileImg}
            alt="Profile Img"
          />
        </Link>
      </div>
      <Link to="/home/">Timeline</Link>
      <Link to="/home/discover">Discover</Link>
    </div>
  );
};

export default NavBar;
