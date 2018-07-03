import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import Posts from "../Posts/Posts";
import "./Timeline.css";

class Timeline extends Component {
  render() {
    console.log(this.props);
    let userPosts = this.props.posts.map(val => {
      const {
        post_id,
        user_id,
        user_name,
        artist_name,
        song_name,
        genre,
        uri,
        profile_img
      } = val;

      return (
        <Posts
          key={post_id}
          userID={user_id}
          userName={user_name}
          artistName={artist_name}
          songName={song_name}
          genre={genre}
          user={user_name}
          uri={uri}
          profileImg={profile_img}
        />
      );
    });

    return (
      <div className="timeline">
        <div className="middle">
          <Link to="/timeline/recent">
            <p>Recent</p>
          </Link>
          <Link to="/timeline/trending">
            <p>Trending</p>
          </Link>
        </div>
        {userPosts}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state;
  return {
    posts
  };
}

export default connect(mapStateToProps)(Timeline);
