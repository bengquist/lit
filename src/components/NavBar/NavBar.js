import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default () => {
  return (
    <div className="navbar">
      <Link to="/timeline/recent">
        <p>
          <span>Timeline</span>
        </p>
      </Link>
      <Link to="/discover">
        <p>
          <span>Discover</span>
        </p>
      </Link>
      <Link to="/profile">
        <p>
          <span>Profile</span>
        </p>
      </Link>
    </div>
  );
};
