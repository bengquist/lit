import React from "react";
import { connect } from "react-redux";
import { deleteFromProfile } from "../../ducks/reducers/reducer";
import "./ProfilePosts.css";

const ProfilePosts = props => {
  const {
    userID,
    postID,
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
        frameBorder="0"
      />
      <div className="info">
        <h1>{artistName}</h1>
        <h2>{songName}</h2>
        <h3>{genre}</h3>
      </div>

      <div className="user">
        <div className="toggle">
          <div>
            <i className="fas fa-edit" />
          </div>
          <div onClick={() => props.deleteFromProfile(postID)} href="#">
            <i className="fas fa-trash-alt" />
          </div>
        </div>
        <img className="profile-img" src={profileImg} alt="" />
        <p>{userName}</p>
      </div>
    </div>
  );
};

export default connect(
  null,
  { deleteFromProfile }
)(ProfilePosts);
