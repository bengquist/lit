import React, { Component } from "react";
import { connect } from "react-redux";
import TimelinePosts from "../TimelinePosts/TimelinePosts";
import "./Timeline.css";

class Timeline extends Component {
  render() {
    const timelinePosts = this.props.posts.map((val, i) => {
      const { uri, timestamp, comment } = val;
      return (
        <TimelinePosts
          key={i}
          uri={uri}
          comment={comment}
          timestamp={timestamp}
        />
      );
    });

    return (
      <div>
        <p>Timeline</p>
        {timelinePosts}
      </div>
    );
  }
}

export default connect(state => state)(Timeline);
