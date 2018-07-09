import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import "./Header.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

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
        <div className="user-login">
          {/* <i className="fas fa-bell" /> */}
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

export default connect(state => state)(Header);
