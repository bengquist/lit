import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../Chart/Chart";
import "./Discover.css";
import _ from "lodash";

import { Input, Menu } from "semantic-ui-react";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Discover extends Component {
  state = {
    search: "",
    selected: "New Releases",
    results: [],
    activeItem: "New Releases"
  };

  componentDidMount() {
    if (this.props.token) {
      spotifyApi.setAccessToken(this.props.token);
    }

    spotifyApi.getNewReleases().then(response => {
      console.log(this.props.token);
      this.setState({ results: response.albums.items });
    });
  }

  changeHandler = () => {
    switch (this.state.selected) {
      case "Artists":
        return () => {
          spotifyApi
            .searchArtists(this.state.search)
            .then(artists => this.setState({ results: artists.artists.items }))
            .catch(() => this.setState({ results: [] }));
        };
      case "Tracks":
        return () => {
          spotifyApi
            .searchTracks(this.state.search)
            .then(tracks => this.setState({ results: tracks.tracks.items }))
            .catch(() => this.setState({ results: [] }));
        };
      case "Albums":
        return () => {
          spotifyApi
            .searchAlbums(this.state.search)
            .then(albums => this.setState({ results: albums.albums.items }))
            .catch(() => this.setState({ results: [] }));
        };
      case "New Releases":
        return () => {
          spotifyApi
            .getNewReleases()
            .then(response => {
              this.setState({ results: response.albums.items });
            })
            .catch(() => this.setState({ results: [] }));
        };
    }
  };

  searchHandler = e => {
    this.setState({ search: e.target.value });
    const activateHandler = this.changeHandler();
    _.debounce(activateHandler, 1500)();
  };

  handleItemClick = (e, { name }) =>
    this.setState({ selected: name, activeItem: name, results: [] });

  handleRecentRelease = (e, { name }) => {
    console.log("New Release clicked");
    spotifyApi.getNewReleases().then(response => {
      this.setState({
        selected: name,
        activeItem: name,
        results: response.albums.items
      });
    });
  };

  render() {
    const { activeItem } = this.state;
    const showResults = this.state.results.map((val, i) => {
      const { popularity, uri } = val;
      return <Chart uri={uri} />;
    });

    return (
      <div className="discover">
        <Menu
          style={{ margin: 0 + " auto" }}
          className="search-header"
          secondary
        >
          <Menu.Item
            name="Artists"
            active={activeItem === "Artists"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Tracks"
            active={activeItem === "Tracks"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Albums"
            active={activeItem === "Albums"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="New Releases"
            active={activeItem === "New Releases"}
            onClick={this.handleRecentRelease}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input
                onChange={event => this.searchHandler(event)}
                icon="search"
                placeholder="Search..."
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="results">{showResults}</div>
      </div>
      // // <div className="discover">
      // //   <div className="input">
      // //     <p>Recent Releases</p>
      // //     <div>
      // //       <Input
      // //         icon="search"
      // //         onChange={event => this.searchHandler(event)}
      // //         type="text"
      // //         placeholder="Search Artist, Song, Genre..."
      // //       />
      // //       <select
      // //         onChange={event => this.selectHandler(event)}
      // //         name="type"
      // //         id="type"
      // //       >
      // //         <option value="Artists">Artist</option>
      // //         <option value="Tracks">Song</option>
      // //         <option value="Albums">Album</option>
      // //       </select>
      // //     </div>
      //   <div>
      //   {showResults}
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(Discover);
