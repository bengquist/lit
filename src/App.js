import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { setToken, setUser, isLoggedIn } from "./ducks/reducers/reducer";
import "./reset.css";
import "./App.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  state = {
    loggedIn: true
  };

  componentDidMount() {
    const params = this.getHashParams();
    const token = params["/access_token"];
    const name = params["name"];
    const email = params["email"];
    const profileImg = params["profile_img"];

    token && spotifyApi.setAccessToken(token);
    !token && this.setState({ loggedIn: false });
    this.props.setUser({ name, email, profileImg });
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
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() =>
              !this.state.loggedIn ? <Redirect to="/login" /> : <Home />
            }
          />
        </Switch>
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
    { setToken, setUser, isLoggedIn }
  )(App)
);
