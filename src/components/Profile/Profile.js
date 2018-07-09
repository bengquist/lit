import React, { Component } from "react";
import { connect } from "react-redux";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import "./Profile.css";

class Profile extends Component {
  render() {
    let userPosts = this.props.posts.map(val => {
      const {
        post_id,
        user_id,
        user_name,
        artist_name,
        song_name,
        genre,
        uri,
        profile_img,
        comment
      } = val;

      return (
        <ProfilePosts
          key={post_id}
          postID={post_id}
          userID={user_id}
          userName={user_name}
          artistName={artist_name}
          songName={song_name}
          genre={genre}
          user={user_name}
          uri={uri}
          profileImg={profile_img}
          comment={comment}
        />
      );
    });

    return (
      <div className="profile">
        <div className="middle" />
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

export default connect(mapStateToProps)(Profile);
