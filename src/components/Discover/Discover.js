import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../Chart/Chart";
import "./Discover.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Discover extends Component {
  state = {
    recentPosts: []
  };

  componentDidMount() {
    if (this.props.token) {
      spotifyApi.setAccessToken(this.props.token);
    }
    spotifyApi.getNewReleases().then(response => {
      this.setState({ recentPosts: response.albums.items });
    });
  }

  render() {
    const albums = this.state.recentPosts.map((album, i) => {
      return (
        <Chart
          key={i}
          artist={album.artists[0].name}
          album={album.name}
          uri={album.uri}
        />
      );
    });

    return <div className="discover">{albums}</div>;
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(Discover);
