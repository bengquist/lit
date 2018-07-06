import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../Chart/Chart";
import "./Discover.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Discover extends Component {
  state = {
    recentAlbums: []
  };

  componentDidMount() {
    if (this.props.token) {
      spotifyApi.setAccessToken(this.props.token);
    }
    spotifyApi.getNewReleases().then(response => {
      this.setState({ recentAlbums: response.albums.items });
    });
  }

  render() {
    console.log();
    const albums = this.state.recentAlbums.map((album, i) => {
      return (
        <Chart
          key={i}
          artist={album.artists[0].name}
          album={album.name}
          uri={album.uri}
          userID={this.props.state.user.user_id}
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
