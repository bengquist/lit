import React, { Component } from "react";
import { connect } from "react-redux";
import TimelinePosts from "../TimelinePosts/TimelinePosts";
import "./Timeline.css";

class Timeline extends Component {
  render() {
    const timelinePosts = this.props.posts.map((val, i) => {
      const { uri, timestamp, comment, profile_img, username } = val;
      return (
        <div>
          <TimelinePosts
            key={i}
            uri={uri}
            comment={comment}
            profileImg={profile_img}
            username={username}
            timestamp={timestamp}
          />
        </div>
      );
    });

    return (
      <div className="timeline">
        <div>{timelinePosts}</div>
      </div>
    );
  }
}

export default connect(state => state)(Timeline);
