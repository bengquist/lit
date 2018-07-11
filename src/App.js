import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import routes from "./routes";
import {
  getAllPosts,
  setToken,
  setUser,
  isLoggedIn
} from "./ducks/reducers/reducer";
import "./reset.css";
import "./App.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  componentDidMount() {
    const params = this.getHashParams();
    const token = params["/access_token"];
    const name = params["name"];
    const email = params["email"];
    const profileImg = params["profile_img"];

    token && spotifyApi.setAccessToken(token);

    this.props.setToken(token);

    this.props.setUser({ name, email, profileImg });
    this.props.getAllPosts();
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    if (this.props.state.user) {
      var profileImg = this.props.state.user.profile_img;
    }

    return (
      <div className="App">
        <Header profileImg={profileImg} />
        <div className="body">
          <NavBar />
          {routes}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getAllPosts, setToken, setUser, isLoggedIn }
  )(App)
);
