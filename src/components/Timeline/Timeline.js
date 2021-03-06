import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  getTimelinePosts,
  unfollowUser,
  likePost,
  unlikePost
} from "../../ducks/reducers/reducer";
import TimelinePosts from "../TimelinePosts/TimelinePosts";
import "./Timeline.css";

class Timeline extends Component {
  state = {
    profileViewPosts: []
  };

  componentWillMount() {
    this.props.getTimelinePosts(this.props.user.user_id);
  }

  componentWillUnmount() {
    this.props.getTimelinePosts(this.props.user.user_id);
  }

  render() {
    let timeline = [];

    this.props.timelinePosts.forEach(posts => {
      posts.forEach(post => {
        timeline.push(post);
      });
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
          transitionAppearTimeout={300}
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
            loggedInUsername={this.props.user.username}
            loggedInUserID={this.props.user.user_id}
            loggedInUserImg={this.props.user.profile_img}
            unfollowUser={this.props.unfollowUser}
            likePost={this.props.likePost}
            unlikePost={this.props.unlikePost}
            likes={likes}
          />
        </ReactCSSTransitionGroup>
      );
    });

    return (
      <div className="timeline">
        {timelinePosts[0] ? (
          timelinePosts
        ) : (
          <ReactCSSTransitionGroup
            transitionName="slide"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
          >
            <p className="no-posts">Follow someone to view their posts here!</p>
          </ReactCSSTransitionGroup>
        )}
      </div>
    );
  }
}

export default connect(
  state => state,
  { getTimelinePosts, unfollowUser, likePost, unlikePost }
)(Timeline);
