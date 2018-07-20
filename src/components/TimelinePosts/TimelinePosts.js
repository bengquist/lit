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
import moment from "moment";
import axios from "axios";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./TimelinePosts.css";

class TimelinePosts extends Component {
  state = {
    loggedInUserID: 0,
    commentID: 0,
    postID: 0,
    posts: [],
    likes: 0,
    alreadyLiked: false,
    commentInput: "",
    initialComments: [],
    comments: [],
    commentLoader: true,
    open: false
  };

  componentDidMount() {
    let { userID, likes, postID, loggedInUserID } = this.props;

    axios
      .get(`/api/posts/${userID}`)
      .then(posts => {
        this.setState({
          posts: posts.data,
          likes,
          loggedInUserID,
          postID
        });
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
          let largestNum = 0;

          comments.data.forEach(val => {
            if (val.comment_id > largestNum) {
              largestNum = val.comment_id;
            }
          });

          this.setState({
            comments: comments.data,
            initialComments: comments.data,
            commentID: largestNum
          });
        });
      });
  }

  closeConfigShow = closeOnEscape => () => {
    this.setState({ closeOnEscape, open: true });
  };

  close = () => this.setState({ open: false });

  commentHandler = event => {
    this.setState({ commentInput: event });
  };

  addComment = (username, profileImg) => {
    this.setState(
      {
        commentInput: "",
        commentID: this.state.commentID + 1,
        comments: [
          ...this.state.comments,
          {
            comment: this.state.commentInput,
            user_id: this.state.loggedInUserID,
            comment_id: this.state.commentID + 1,
            username,
            profileImg
          }
        ]
      },
      () => {
        let newComments = this.state.comments.filter(
          (val, i) => val[i] === this.state.initialComments[i]
        );
        axios.put(
          `/api/comments/${this.state.postID}/${this.state.loggedInUserID}`,
          {
            comments: newComments
          }
        );
      }
    );
  };

  deleteComment = commentID => {
    let newComments = this.state.comments.filter(
      val => commentID !== val.comment_id
    );
    this.setState({ comments: newComments }, () => {
      axios.delete(`/api/comments/${commentID}`);
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
      loggedInUsername,
      loggedInUserID,
      loggedInUserImg,
      userID,
      postID,
      closeOnEscape
    } = this.props;

    timestamp = moment(timestamp)
      .startOf()
      .fromNow();

    let profileView;

    // map through users posts for modal
    this.state.posts &&
      (profileView = this.state.posts.map((val, i) => {
        let { uri, comment, timestamp } = val;
        timestamp = moment(timestamp)
          .startOf()
          .fromNow();

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
      const { comment_id } = val;
      timestamp = moment(val.timestamp)
        .startOf()
        .fromNow();

      return (
        <ReactCSSTransitionGroup
          key={i}
          transitionName="slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          <Comment>
            <Comment.Avatar src={val.profile_img || val.profileImg} />
            <Comment.Content>
              <Comment.Author as="a">{val.username}</Comment.Author>
              <Comment.Metadata>
                <div>{timestamp}</div>
              </Comment.Metadata>

              <Comment.Text>{val.comment}</Comment.Text>
              <Comment.Actions>
                {val.user_id === loggedInUserID && (
                  <div className="personal-toggle">
                    <span
                      onClick={() => this.deleteComment(comment_id)}
                      className="personal-toggle-item"
                    >
                      {" "}
                      Delete
                    </span>
                  </div>
                )}
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </ReactCSSTransitionGroup>
      );
    });

    return (
      <div className="posts">
        <div className="user">
          <img
            onClick={() =>
              this.setState({ open: true }, () => {
                axios.get(`/api/posts/${userID}`).then(posts => {
                  this.setState({
                    posts: posts.data
                  });
                });
              })
            }
            className="profile-img"
            src={profileImg}
            alt="profile_img"
          />
          <Modal
            id="modal"
            open={this.state.open}
            closeOnEscape={closeOnEscape}
            onClose={this.close}
          >
            <Modal.Header id="modal">{username}</Modal.Header>
            <Modal.Content image scrolling>
              <Image id="profile-view-img" src={profileImg} wrapped />

              <Modal.Description>
                <Header>Posts</Header>
                {profileView}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions id="modal">
              <Button
                style={{ backgroundColor: "#DC3545" }}
                onClick={() => {
                  this.setState({ open: false });
                  unfollowUser(loggedInUserID, userID).then(yo =>
                    axios.get(`/api/posts/${userID}`).then(posts => {
                      this.setState({
                        posts: posts.data
                      });
                    })
                  );
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
                onClick={() =>
                  this.addComment(
                    loggedInUsername,
                    loggedInUserImg,
                    loggedInUserID
                  )
                }
                content="Add Reply"
                labelPosition="left"
                icon="edit"
              />
            </Form>
          </Comment.Group>
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
        </div>
      </div>
    );
  }
}

export default TimelinePosts;
