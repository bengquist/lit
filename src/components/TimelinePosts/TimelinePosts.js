import React from "react";
import "./TimelinePosts.css";

const TimelinePosts = props => {
  const { uri, comment, timestamp } = props;

  return (
    <div className="posts">
      <iframe src={`https://embed.spotify.com/?uri=${uri}`} frameborder="0" />
      <p>{comment}</p>
      <p>{timestamp}</p>
    </div>
  );
};

export default TimelinePosts;
