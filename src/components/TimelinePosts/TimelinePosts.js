import React from "react";
import "./TimelinePosts.css";

const TimelinePosts = props => {
  const { uri, comment, timestamp, profileImg, username } = props;

  return (
    <div className="posts">
      <iframe
        src={`https://embed.spotify.com/?uri=${uri}`}
        height="80"
        frameborder="0"
      />
      <div className="info">
        <p>{comment}</p>
        <p>{timestamp}</p>
      </div>
      <div className="user">
        <img className="profile-img" src={profileImg} alt="profile_img" />
        <p>{username}</p>
      </div>
    </div>
  );
};

export default TimelinePosts;
