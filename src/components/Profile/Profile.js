import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfilePosts } from "../../ducks/reducers/reducer";
import RelatedArtists from "../RelatedArtists/RelatedArtists";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import _ from "lodash";
import SpotifyWebApi from "spotify-web-api-js";
import "./Profile.css";

const spotifyApi = new SpotifyWebApi();

class Profile extends Component {
  state = {
    relatedArtists: []
  };

  componentDidMount() {
    let artistName = "";
    let artistID = "";
    let randomNum = 0;

    this.props.getProfilePosts(this.props.user.user_id).then(() => {
      spotifyApi.setAccessToken(this.props.token);

      if (this.props.profilePosts[0]) {
        randomNum = _.random(0, this.props.profilePosts.length - 1);
        console.log(randomNum);
        artistName = this.props.profilePosts[randomNum].artist_name;
      }

      spotifyApi
        .search(artistName, ["artist"])
        .then(artists => (artistID = artists.artists.items[0].id))
        .then(() =>
          spotifyApi
            .getArtistRelatedArtists(artistID)
            .then(artists => this.setState({ relatedArtists: artists.artists }))
        );
    });
  }

  render() {
    let userPosts = this.props.profilePosts.map(val => {
      const {
        post_id,
        user_id,
        username,
        uri,
        profile_img,
        comment,
        timestamp
      } = val;

      return (
        <ProfilePosts
          key={post_id}
          postID={post_id}
          userID={user_id}
          userName={username}
          uri={uri}
          profileImg={profile_img}
          comment={comment}
          timestamp={timestamp}
        />
      );
    });

    let relatedArtists = this.state.relatedArtists.map(val => {
      console.log(val);
      const { name, popularity, uri } = val;
      const image = val.images[0].url;

      return (
        <RelatedArtists
          name={name}
          popularity={popularity}
          uri={uri}
          image={image}
        />
      );
    });

    return (
      <div className="profile">
        <div className="user-posts">
          <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
          >
            {userPosts[0] ? (
              userPosts
            ) : (
              <p className="no-posts">
                Add songs to your profile to view them here!
              </p>
            )}
          </ReactCSSTransitionGroup>
        </div>

        <div className="related-artists">
          <h1>Related Artists</h1>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={300}
          >
            {relatedArtists}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  { getProfilePosts }
)(Profile);
