import React, { Component } from "react";
import { Button, Header, Icon, Image, Modal, Loader } from "semantic-ui-react";
import classnames from "classnames";
import axios from "axios";
import "./TimelinePosts.css";

class TimelinePosts extends Component {
  state = {
    posts: [],
    likes: 0,
    alreadyLiked: false
  };

  componentDidMount() {
    let { userID, likes, postID, loggedInUserID } = this.props;
    axios
      .get(`/api/posts/${userID}`)
      .then(posts => this.setState({ posts: posts.data, likes }))
      .then(() => {
        axios
          .get(`/api/post/${loggedInUserID}/${postID}`)
          .then(alreadyLiked =>
            this.setState({ alreadyLiked: alreadyLiked.data })
          );
      });
  }

  render() {
    let {
      uri,
      comment,
      timestamp,
      profileImg,
      username,
      unfollowUser,
      likePost,
      unlikePost,
      loggedInUserID,
      userID,
      postID
    } = this.props;

    timestamp = timestamp.replace("T", " ");
    let profileView;

    this.state.posts &&
      (profileView = this.state.posts.map(val => {
        let { uri, comment, timestamp } = val;
        timestamp = timestamp.replace("T", " ");

        return (
          <div className="profile-view">
            <iframe
              title="spotify"
              className="profile-iframe"
              src={`https://embed.spotify.com/?uri=${uri}`}
              frameBorder="0"
              height="80"
            />
            <div className="profile-view-info">
              <h2 className="profile-comment">
                {comment}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores eligendi esse quaerat eveniet, explicabo quae sequi
                et qui eum repellendus?
              </h2>
              <h2 className="profile-view-time">{timestamp}</h2>
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
              <Button
                style={{ backgroundColor: "#DC3545" }}
                onClick={() => unfollowUser(loggedInUserID, userID)}
                id="profile-button"
              >
                Unfollow <Icon name="chevron right" />
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
          <i
            className={classnames("fa-arrow-alt-circle-up", {
              fas: this.state.alreadyLiked,
              far: !this.state.alreadyLiked
            })}
            onClick={() => {
              if (!this.state.alreadyLiked) {
                likePost(loggedInUserID, postID);
                this.setState({
                  likes: this.state.likes + 1,
                  alreadyLiked: !this.state.alreadyLiked
                });
              } else {
                unlikePost(loggedInUserID, postID);
                this.setState({
                  likes: this.state.likes - 1,
                  alreadyLiked: !this.state.alreadyLiked
                });
              }
            }}
          />
          <p>{this.state.likes}</p>
          <i className="far fa-comments" />
        </div>
      </div>
    );
  }
}

export default TimelinePosts;
