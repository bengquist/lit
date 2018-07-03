import React from "react";
import "./Posts.css";

export default props => {
  const {
    userID,
    userName,
    artistName,
    songName,
    genre,
    uri,
    profileImg
  } = props;
  return (
    <div className="posts">
      <iframe
        src={`https://embed.spotify.com/?uri=${uri}`}
        height="80"
        frameborder="0"
      />
      <h1>{artistName}</h1>
      <h2>{songName}</h2>
      <h3>{genre}</h3>
      <img className="profile-img" src={profileImg} alt="" />
      <p>{userName}</p>
    </div>
  );
};
