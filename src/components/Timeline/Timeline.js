import React, { Component } from "react";
import "./Timeline.css";

export default class Timeline extends Component {
  render() {
    return (
      <div className="timeline">
        <div className="middle">
          <p>Recent</p>
          <p>Trending</p>
        </div>
        <input type="text" placeholder="Search Friends..." />
      </div>
    );
  }
}
