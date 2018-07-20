import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Chart from "../Chart/Chart";
import { followUser } from "../../ducks/reducers/reducer";
import axios from "axios";
import { withAlert } from "react-alert";
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
    users: [],
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state !== nextState) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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
            .then(tracks => {
              console.log(tracks);
              this.setState({ results: tracks.tracks.items });
            })
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
        console.log(this.state.search);
        return () => {
          axios.get(`/api/users/${this.state.search}`).then(users => {
            console.log(users);
            this.setState({ users: users.data });
          });
        };
      default:
    }
  };

  searchHandler = e => {
    this.setState({ search: e.target.value }, () => {
      const activateHandler = this.changeHandler();

      _.debounce(activateHandler, 500)();

      if (this.state.search.length === 0) {
        this.setState({ users: [] });
      }
    });
  };

  handleItemClick = (e, { name }) => {
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
      const { uri } = val;
      let popularity = "";
      val.popularity && (popularity = val.popularity);

      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}
          key={i}
        >
          <Chart uri={uri} popularity={popularity} />
        </ReactCSSTransitionGroup>
      );
    });

    const userResults = this.state.users.map((val, i) => {
      const { username, profile_img, user_id } = val;

      return (
        <div className="single-user-result">
          <img src={profile_img} alt="" />
          <p>{username}</p>
          <i
            onClick={() => {
              if (userID !== user_id) {
                this.props.followUser(userID, user_id);
                this.props.alert.show(`You are now following ${username}`);
              } else {
                this.props.alert.show(`You are already following ${username}`);
              }
              this.setState({ users: [] });
            }}
            className="far fa-plus-square"
          />
        </div>
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
            id={activeItem === "Artists" ? "bg-active" : null}
          />
          <Menu.Item
            style={{ color: "#fff" }}
            name="Tracks"
            active={activeItem === "Tracks"}
            onClick={this.handleItemClick}
            id={activeItem === "Tracks" ? "bg-active" : null}
          />
          <Menu.Item
            style={{ color: "#fff" }}
            name="Albums"
            active={activeItem === "Albums"}
            onClick={this.handleItemClick}
            id={activeItem === "Albums" ? "bg-active" : null}
          />
          <Menu.Item
            style={{ color: "#fff" }}
            name="New Releases"
            active={activeItem === "New Releases"}
            onClick={this.handleRecentRelease}
            id={activeItem === "New Releases" ? "bg-active" : null}
          />
          <Menu.Menu position="right">
            <Menu.Item
              style={{ color: "#fff" }}
              name="People"
              active={activeItem === "People"}
              onClick={this.handleRecentRelease}
              id={activeItem === "People" ? "bg-active" : null}
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

export default withAlert(
  connect(
    mapStateToProps,
    { followUser }
  )(Discover)
);
