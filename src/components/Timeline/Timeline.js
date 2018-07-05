import React, { Component } from "react";
import { connect } from "react-redux";
import "./Timeline.css";

class Timeline extends Component {
  render() {
    const timelinePosts = this.props.posts.map((val, i) => {
      return <p key={i}>{val.timestamp}</p>;
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
