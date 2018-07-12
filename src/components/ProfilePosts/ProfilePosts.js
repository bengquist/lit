import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteFromProfile,
  editProfilePost
} from "../../ducks/reducers/reducer";
import { Form, TextArea } from "semantic-ui-react";
import "./ProfilePosts.css";

class ProfilePosts extends Component {
  state = {
    edit: false,
    input: ""
  };

  editToggle(cmt) {
    this.setState({ edit: !this.state.edit, input: cmt });
  }

  inputHandler(e) {
    this.setState({ input: e });
  }

  render() {
    console.log(this.props);
    const {
      userID,
      postID,
      userName,
      uri,
      profileImg,
      comment,
      timestamp
    } = this.props;
    const { edit } = this.state;
    let editToggle;

    if (!edit) {
      editToggle = (
        <div>
          <p>{comment}</p>
          <p onClick={() => this.editToggle(comment)}>Edit</p>
        </div>
      );
    } else {
      editToggle = (
        <div>
          <TextArea
            value={this.state.input}
            onChange={event => this.inputHandler(event.target.value)}
          />
          <p onClick={() => this.editToggle()}>Cancel</p>
          <p
            onClick={() => {
              this.editToggle();
              this.props.editProfilePost(postID, this.state.input, userID);
            }}
          >
            Confirm
          </p>
        </div>
      );
    }

    return (
      <div className="posts">
        <iframe
          src={`https://embed.spotify.com/?uri=${uri}`}
          height="80"
          frameBorder="0"
        />
        <div className="info">
          <p>{editToggle}</p>
          <p>{timestamp}</p>
        </div>

        <div className="user">
          <div className="toggle">
            <i
              onClick={() => this.props.deleteFromProfile(postID)}
              className="fas fa-trash-alt"
            />
          </div>
          <img className="profile-img" src={profileImg} alt="" />
          <p>{userName}</p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  { deleteFromProfile, editProfilePost }
)(ProfilePosts);
