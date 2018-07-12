import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfilePosts } from "../../ducks/reducers/reducer";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfilePosts(this.props.user.user_id);
  }

  render() {
    console.log(this.props);
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

    return (
      <div className="profile">
        <div className="middle" />
        {userPosts}
      </div>
    );
  }
}

export default connect(
  state => state,
  { getProfilePosts }
)(Profile);
