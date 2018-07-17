import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteFromProfile,
  editProfilePost
} from "../../ducks/reducers/reducer";
import { TextArea, Button, Icon } from "semantic-ui-react";
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
    let {
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
          <p className="comment">{comment}</p>
        </div>
      );
    } else {
      editToggle = (
        <div className="toggle-content">
          <TextArea
            id="text-area"
            autoHeight
            value={this.state.input}
            onChange={event => this.inputHandler(event.target.value)}
          />

          <div className="toggle-btns">
            <Button
              style={{ backgroundColor: "#DC3545", color: "#fff" }}
              onClick={() => this.editToggle()}
              animated="vertical"
            >
              <Button.Content hidden>Cancel</Button.Content>
              <Button.Content visible>
                <Icon style={{ color: "#fff" }} name="cancel" />
              </Button.Content>
            </Button>
            <Button
              style={{ marginTop: "5px" }}
              onClick={() => {
                this.editToggle();
                this.props.editProfilePost(postID, this.state.input, userID);
              }}
              animated="vertical"
            >
              <Button.Content hidden>Confirm</Button.Content>
              <Button.Content visible>
                <Icon name="check" />
              </Button.Content>
            </Button>
          </div>
        </div>
      );
    }

    if (this.state.toggle) {
      toggle = (
        <div className="profile-toggle">
          <p
            className="toggle-item"
            onClick={() => {
              this.toggle();
              this.editToggle(comment);
            }}
          >
            Edit
          </p>
          <p
            className="toggle-item"
            onClick={() => {
              this.toggle();
              this.props.deleteFromProfile(postID, userID);
            }}
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
            <p className="timestamp">{timestamp}</p>
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
