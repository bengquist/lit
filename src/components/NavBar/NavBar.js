import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          l<div logo-flame>
            i<i className="fas fa-fire" />
          </div>t
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
      <Link to="/">Timeline</Link>
      <Link to="/discover">Discover</Link>
    </div>
  );
};

export default NavBar;
