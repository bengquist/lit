import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import Posts from "../Posts/Posts";
import "./Timeline.css";

class Timeline extends Component {
  render() {
    let userPosts = this.props.posts.map(val => {
      const { post_id, user_id, artist_name, song_name, genre } = val;
      return (
        <Posts
          key={post_id}
          userID={user_id}
          artistName={artist_name}
          songName={song_name}
          genre={genre}
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
        <input type="text" placeholder="Search Friends..." />
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
