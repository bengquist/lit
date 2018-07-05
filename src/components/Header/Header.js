import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

class Header extends Component {
  render() {
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
          <select name="type" id="type">
            <option value="artist">Artist</option>
            <option value="song">Song</option>
            <option value="Album">Album</option>
          </select>
          <input
            className="search"
            type="text"
            placeholder="Search Artist, Song, Genre..."
          />
          <button>Search</button>
        </div>
        <div className="user-login">
          <i className="fas fa-bell" />
          <Link to="/profile">
            <img
              className="profile_img"
              src={this.props.profileImg}
              alt="Profile Img"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
