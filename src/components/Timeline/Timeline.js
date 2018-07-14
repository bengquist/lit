import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getTimelinePosts } from "../../ducks/reducers/reducer";
import TimelinePosts from "../TimelinePosts/TimelinePosts";
import "./Timeline.css";

class Timeline extends Component {
  componentDidMount() {
    this.props.getTimelinePosts(this.props.user.user_id);
  }

  render() {
    let timeline = [];

    this.props.timelinePosts.forEach(posts => {
      posts.forEach(post => timeline.push(post));
    });

    console.log(timeline);

    const timelinePosts = timeline.map((val, i) => {
      console.log(val);
      const { uri, timestamp, comment, profile_img, username } = val;

      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          <TimelinePosts
            key={i}
            uri={uri}
            comment={comment}
            profileImg={profile_img}
            username={username}
            timestamp={timestamp}
          />
        </ReactCSSTransitionGroup>
      );
    });

    return <div className="timeline">{timelinePosts}</div>;
  }
}

export default connect(
  state => state,
  { getTimelinePosts }
)(Timeline);
