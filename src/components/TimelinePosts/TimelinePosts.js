import React, { Component } from "react";
import { Button, Header, Icon, Image, Modal, Loader } from "semantic-ui-react";
import axios from "axios";
import "./TimelinePosts.css";

class TimelinePosts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    let { userID } = this.props;
    axios
      .get(`/api/posts/${userID}`)
      .then(posts => this.setState({ posts: posts.data }));
  }

  render() {
    let { uri, comment, timestamp, profileImg, username } = this.props;

    timestamp = timestamp.replace("T", " ");
    let profileView;

    this.state.posts &&
      (profileView = this.state.posts.map(val => {
        const { uri, comment, timestamp } = val;

        return (
          <div className="profile-view">
            <iframe
              title="spotify"
              className="profile-iframe"
              src={`https://embed.spotify.com/?uri=${uri}`}
              frameBorder="0"
              height="80"
            />
            <div className="profile-info">
              <h2 className="profile-comment">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores eligendi esse quaerat eveniet, explicabo quae sequi
                et qui eum repellendus?
              </h2>
              <h2 className="profile-time">{timestamp}</h2>
            </div>
          </div>
        );
      }));

    return (
      <div className="posts">
        <div className="user">
          <Modal
            trigger={
              <img className="profile-img" src={profileImg} alt="profile_img" />
            }
          >
            <Modal.Header id="modal">{username}</Modal.Header>
            <Modal.Content image scrolling>
              <Image
                id="profile-view-img"
                size="large"
                src={profileImg}
                wrapped
              />

              <Modal.Description>
                <Header>Posts</Header>
                {profileView}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions id="modal">
              <Button onClick={() => alert("added")} id="profile-button">
                Follow <Icon name="chevron right" />
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div className="info">
          <div className="banner">
            <p className="user-name">{username}</p>
            <span className="timestamp">{timestamp}</span>
          </div>

          <Loader
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 70,
              zIndex: 0
            }}
            active
            inline="centered"
          />
          <iframe
            title="spotify"
            src={`https://embed.spotify.com/?uri=${uri}`}
            height="80"
            frameBorder="0"
          />
          <p className="comment">
            {comment} Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptates eum fugiat beatae sunt nemo accusamus. Autem explicabo
            impedit commodi nisi?
          </p>
        </div>
        <div className="arrow">
          <i className="far fa-arrow-alt-circle-up" />
          <i className="far fa-comments" />
        </div>
      </div>
    );
  }
}

export default TimelinePosts;
