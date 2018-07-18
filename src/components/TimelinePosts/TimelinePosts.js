import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
  Loader,
  Comment,
  Form
} from "semantic-ui-react";
import classnames from "classnames";
import axios from "axios";
import "./TimelinePosts.css";

class TimelinePosts extends Component {
  state = {
    open: false,
    posts: [],
    likes: 0,
    alreadyLiked: false,
    commentInput: "",
    comments: []
  };

  componentDidMount() {
    let { userID, likes, postID, loggedInUserID } = this.props;

    axios
      .get(`/api/posts/${userID}`)
      .then(posts => {
        this.setState({ posts: posts.data, likes });
      })
      .then(() => {
        axios
          .get(`/api/post/${loggedInUserID}/${postID}`)
          .then(alreadyLiked =>
            this.setState({ alreadyLiked: alreadyLiked.data })
          );
      })
      .then(() => {
        axios.get(`/api/comments/${postID}`).then(comments => {
          console.log(comments.data);
          this.setState({
            comment: comments.data.comment,
            timestamp: comments.data.timestamp,
            username: comments.data.user_name,
            profileImg: comments.data.profile_img
          });
        });
      });
  }

  commentHandler = event => {
    this.setState({ commentInput: event });
  };

  addComment = (username, profileImg) => {
    this.setState({
      comments: [
        ...this.state.comments,
        { comment: this.state.commentInput, username, profileImg }
      ]
    });
  };

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
      loggedInUserImg,
      userID,
      postID
    } = this.props;

    const { open } = this.state;

    let profileView;

    // map through users posts for modal
    this.state.posts &&
      (profileView = this.state.posts.map((val, i) => {
        let { uri, comment, timestamp } = val;

        return (
          <div key={i} className="profile-view">
            <iframe
              title="spotify"
              className="profile-iframe"
              src={`https://embed.spotify.com/?uri=${uri}`}
              frameBorder="0"
              height="80"
            />
            <div className="profile-view-info">
              <h2 className="profile-comment">{comment}</h2>
              <h2 className="profile-view-time">{timestamp}</h2>
            </div>
          </div>
        );
      }));

    // map through comments
    const usersComments = this.state.comments.map((val, i) => {
      console.log(val);
      return (
        <Comment>
          <Comment.Avatar src={val.profileImg} />
          <Comment.Content>
            <Comment.Author as="a">{val.username}</Comment.Author>
            <Comment.Metadata>
              <div>{val.timestamp}</div>
            </Comment.Metadata>
            <Comment.Text>{val.comment}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    });

    return (
      <div className="posts">
        <div className="user">
          <Modal
            open={open}
            closeOnEscape={false}
            closeOnDimmerClick={true}
            trigger={
              <img
                onClick={() => this.setState({ open: true })}
                className="profile-img"
                src={profileImg}
                alt="profile_img"
              />
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
                onClick={() => {
                  unfollowUser(loggedInUserID, userID);
                  this.setState({ open: false });
                }}
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
              top: 85,
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
          <p className="comment">{comment}</p>
          <Comment.Group style={{ width: "80%", margin: "0 auto" }}>
            <Header as="h3" dividing />
            {usersComments}

            <Form reply>
              <Form.TextArea
                value={this.state.commentInput}
                onChange={e => this.commentHandler(e.target.value)}
                style={{ height: "100px" }}
              />
              <Button
                onClick={() => this.addComment(loggedInUserID, loggedInUserImg)}
                content="Add Reply"
                labelPosition="left"
                icon="edit"
              />
            </Form>
          </Comment.Group>
        </div>
        <div className="arrow">
          <p>{this.state.likes}</p>
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
        </div>
      </div>
    );
  }
}

export default TimelinePosts;
