import React from "react";
import { Loader } from "semantic-ui-react";
import "./TimelinePosts.css";

const TimelinePosts = props => {
  const { uri, comment, timestamp, profileImg, username } = props;

  return (
    <div className="posts">
      <div className="user">
        <img className="profile-img" src={profileImg} alt="profile_img" />
      </div>
      <div className="info">
        <div className="banner">
          <p className="user-name">{username} </p>
          <span className="timestamp">- {timestamp}</span>
        </div>

        <p className="comment">
          {comment} Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Voluptates eum fugiat beatae sunt nemo accusamus. Autem explicabo
          impedit commodi nisi?
        </p>
        <Loader
          style={{
            position: "absolute",
            zIndex: 0,
            left: 0,
            right: 0,
            top: 150,
            zIndex: 0
          }}
          active
          inline="centered"
        />
        <iframe
          className="iframe"
          src={`https://embed.spotify.com/?uri=${uri}`}
          height="80"
          frameborder="0"
        />
      </div>
      <div className="arrow">
        <i class="fas fa-chevron-circle-up" />
      </div>
    </div>
  );
};

export default TimelinePosts;
