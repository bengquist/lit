import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default () => {
  return (
    <div className="navbar">
      <Link to="/timeline/recent">
        <p className="links">
          <span>Timeline</span>
        </p>
      </Link>
      <Link to="/discover">
        <p className="links">
          <span>Discover</span>
        </p>
      </Link>
      <Link to="/profile">
        <p className="links">
          <span>Profile</span>
        </p>
      </Link>
    </div>
  );
};
