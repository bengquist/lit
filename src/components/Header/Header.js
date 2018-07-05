import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./Header.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Header extends Component {
  state = {
    search: "",
    selected: "Artists",
    results: []
  };

  componentDidMount() {
    spotifyApi.setAccessToken(this.props.token);
  }

  searchHandler = e => {
    this.setState({ search: e.target.value });
  };

  selectHandler = e => {
    this.setState({ selected: e.target.value });
  };

  clickHander = () => {
    switch (this.state.selected) {
      case "Artists":
        return spotifyApi
          .searchArtists(this.state.search)
          .then(artists => this.setState({ results: artists.artists.items }));
      case "Tracks":
        return spotifyApi
          .searchTracks(this.state.search)
          .then(tracks => this.setState({ results: tracks.tracks.items }));
      case "Albums":
        return spotifyApi
          .searchAlbums(this.state.search)
          .then(albums => this.setState({ results: albums.albums.items }));
    }
  };

  render() {
    const showResults = this.state.results.map((val, i) => {
      console.log(val);
      return <p key={i}>{val.name}</p>;
    });

    console.log(this.state.results);
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
          <button onClick={() => this.clickHander()}>Search</button>
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
        {showResults}
      </div>
    );
  }
}

export default connect(state => state)(Header);
