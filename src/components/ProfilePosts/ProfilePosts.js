import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteFromProfile,
  editProfilePost
} from "../../ducks/reducers/reducer";
import { TextArea } from "semantic-ui-react";
import "./ProfilePosts.css";

class ProfilePosts extends Component {
  state = {
    edit: false,
    input: "",
    toggle: false
  };

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  editToggle(cmt) {
    this.setState({ edit: !this.state.edit, input: cmt });
  }

  inputHandler(e) {
    this.setState({ input: e });
  }

  render() {
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
    let toggle;

    if (!edit) {
      editToggle = (
        <div>
          <p className="comment">
            {comment} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maxime repudiandae aperiam vero eaque magni quisquam aliquid nihil
            facere dicta possimus!
          </p>
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

    if (this.state.toggle) {
      toggle = (
        <div className="profile-toggle">
          <p className="toggle-item" onClick={() => this.editToggle(comment)}>
            Edit
          </p>
          <p
            className="toggle-item"
            onClick={() => this.props.deleteFromProfile(postID, userID)}
          >
            Delete
          </p>
        </div>
      );
    }

    return (
      <div className="profile-posts">
        <img className="profile-img" src={profileImg} alt="" />
        <div className="info">
          <div className="profile-info">
            <p>{userName}</p>
            <p>{timestamp}</p>
          </div>

          <iframe
            title="spotify"
            src={`https://embed.spotify.com/?uri=${uri}`}
            height="80"
            frameBorder="0"
          />

          {editToggle}
        </div>

        <div className="toggle-items">
          <i onClick={() => this.toggle()} className="fas fa-angle-down" />
          <div className="toggle-options">{toggle}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  { deleteFromProfile, editProfilePost }
)(ProfilePosts);
