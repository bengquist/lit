import React from "react";
import "./Posts.css";

export default props => {
  const { userID, artistName, songName, genre } = props;
  return (
    <div className="posts">
      <h1>{artistName}</h1>
      <h2>{songName}</h2>
      <h3>{genre}</h3>
    </div>
  );
};
