import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Chart from "../Chart/Chart";
import { searchUsers, followUser } from "../../ducks/reducers/reducer";
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
      this.setState({ results: response.albums.items });
    });
  }

  componentWillUnmount() {
    this.props.searchUsers("");
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
      case "People":
        return () => {
          spotifyApi;
          this.props.searchUsers(this.state.search);
          console.log(this.props.state.users);
        };
    }
  };

  searchHandler = e => {
    this.setState({ search: e.target.value });
    const activateHandler = this.changeHandler();
    _.debounce(activateHandler, 500)();
  };

  handleItemClick = (e, { name }) => {
    this.props.searchUsers("");
    this.setState({
      selected: name,
      activeItem: name,
      results: [],
      search: ""
    });
  };

  handleRecentRelease = (e, { name }) => {
    spotifyApi.getNewReleases().then(response => {
      this.setState({
        selected: name,
        activeItem: name,
        results: response.albums.items,
        search: ""
      });
    });
  };

  render() {
    const { activeItem } = this.state;
    const userID = this.props.state.user.user_id;

    const showResults = this.state.results.map((val, i) => {
      const { popularity, uri } = val;
      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          <Chart uri={uri} />
        </ReactCSSTransitionGroup>
      );
    });

    const userResults = this.props.state.users.map(val => {
      const { username, profile_img, user_id } = val;

      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          <div className="single-user-result">
            <img src={profile_img} alt="" />
            <p>{username}</p>
            <i
              onClick={() => {
                userID != user_id && this.props.followUser(userID, user_id);
              }}
              class="far fa-plus-square"
            />
          </div>
        </ReactCSSTransitionGroup>
      );
    });

    return (
      <div className="discover">
        <Menu
          style={{
            margin: "30px auto",
            backgroundColor: "#1d212a",
            boxShadow: "0 4px 2px -2px #268C52",
            height: "70px"
          }}
          className="search-header"
          secondary
        >
          <Menu.Item
            style={{ color: "#fff" }}
            name="Artists"
            active={activeItem === "Artists"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            style={{ color: "#fff" }}
            name="Tracks"
            active={activeItem === "Tracks"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            style={{ color: "#fff" }}
            name="Albums"
            active={activeItem === "Albums"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            style={{ color: "#fff" }}
            name="New Releases"
            active={activeItem === "New Releases"}
            onClick={this.handleRecentRelease}
          />
          <Menu.Menu position="right">
            <Menu.Item
              style={{ color: "#fff" }}
              name="People"
              active={activeItem === "People"}
              onClick={this.handleRecentRelease}
            />
            <Menu.Item
              style={{ position: "relative", display: "inline-block" }}
            >
              <Input
                value={this.state.search}
                style={{ width: "350px" }}
                onChange={event => this.searchHandler(event)}
                icon="search"
                placeholder="Search..."
              />
              <div className="user-results">{userResults}</div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <div className="results">{showResults}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(
  mapStateToProps,
  { searchUsers, followUser }
)(Discover);
