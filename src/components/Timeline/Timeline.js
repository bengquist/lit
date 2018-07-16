import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  getTimelinePosts,
  unfollowUser,
  likePost
} from "../../ducks/reducers/reducer";
import TimelinePosts from "../TimelinePosts/TimelinePosts";
import "./Timeline.css";

class Timeline extends Component {
  componentWillMount() {
    this.props.getTimelinePosts(this.props.user.user_id);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props, nextProps);
  //   return false;
  // }

  render() {
    let timeline = [];

    this.props.timelinePosts.forEach(posts => {
      posts.forEach(post => timeline.push(post));
    });

    const timelinePosts = timeline.map((val, i) => {
      const {
        uri,
        timestamp,
        comment,
        profile_img,
        username,
        user_id,
        post_id,
        likes
      } = val;

      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
          key={i}
        >
          <TimelinePosts
            key={i}
            postID={post_id}
            uri={uri}
            comment={comment}
            profileImg={profile_img}
            username={username}
            timestamp={timestamp}
            userID={user_id}
            loggedInUserID={this.props.user.user_id}
            unfollowUser={this.props.unfollowUser}
            likePost={this.props.likePost}
            likes={likes}
          />
        </ReactCSSTransitionGroup>
      );
    });

    return <div className="timeline">{timelinePosts}</div>;
  }
}

export default connect(
  state => state,
  { getTimelinePosts, unfollowUser, likePost }
)(Timeline);
