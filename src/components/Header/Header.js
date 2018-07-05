import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

class Header extends Component {
  state = {
    search: "",
    selected: ""
  };

  searchHandler = e => {
    this.setState({ search: e.target.value });
  };

  selectHandler = e => {
    this.setState({ selected: e.target.value });
  };

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
          <select
            onChange={event => this.selectHandler(event)}
            name="type"
            id="type"
          >
            <option value="Artists">Artist</option>
            <option value="Tracks">Song</option>
            <option value="Albums">Album</option>
          </select>
          <input
            onChange={event => this.searchHandler(event)}
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
