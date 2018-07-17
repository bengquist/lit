const _ = require("lodash");

module.exports = {
  getProfilePosts: (req, res, next) => {
    const db = req.app.get("db");
    const { userID } = req.params;

    db.getAllPosts([userID])
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => console.log(err));
  },

  addToProfile: (req, res, next) => {
    const db = req.app.get("db");

    const { uri, userID, comment } = req.body;

    db.addToProfile([uri, userID, comment]).then(posts => {
      res.status(200).send(posts);
    });
  },

  deleteFromProfile: (req, res, next) => {
    const db = req.app.get("db");

    const { postID, userID } = req.params;

    db.deleteFromProfile([postID, userID]).then(posts => {
      res.status(200).send(posts);
    });
  },

  editProfilePost: (req, res, next) => {
    const db = req.app.get("db");

    const { id } = req.params;
    const { comment, userID } = req.body;

    db.editProfilePost([id, comment, userID]).then(posts => {
      res.status(200).send(posts);
    });
  },

  getTimelinePosts: (req, res, next) => {
    const db = req.app.get("db");

    const { userID } = req.params;

    db.getFollowing([userID])
      .then(friends => {
        return Promise.all(
          friends.map(({ friend_id }) => db.getTimelinePosts(friend_id))
        );
      })
      .then(timelinePosts => {
        res.status(200).send(timelinePosts);
      });
  },

  likePost: (req, res, next) => {
    const db = req.app.get("db");

    const { postID } = req.params;
    const { userID } = req.body;

    db.likePost([postID, userID])
      .then(likedPosts => {
        res.status(200).send();
      })
      .catch(err => console.log(err));
  },

  unlikePost: (req, res, next) => {
    const db = req.app.get("db");

    const { postID, userID } = req.params;

    db.unlikePost([postID, userID])
      .then(likedPosts => res.sendStatus(200))
      .catch(err => console.log(err));
  },

  checkLike: (req, res, next) => {
    const db = req.app.get("db");

    const { userID, postID } = req.params;

    db.checkLike([userID, postID]).then(alreadyLiked => {
      console.log(alreadyLiked);

      if (!_.isEmpty(alreadyLiked)) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    });
  },

  addUser: (req, res, next) => {
    const db = req.app.get("db");
    const { name, email, profileImg } = req.body;

    db.users
      .where("email=$1", [email])
      .then(user => {
        if (!_.isEmpty(user)) {
          db.getUser([email]).then(user => {
            res.status(200).send(user);
          });
        } else {
          email &&
            db.addUser([email, name, profileImg]).then(user => {
              res.status(200).send(user);
            });
        }
      })
      .catch(err => console.log(err));
  },

  searchUsers: (req, res, next) => {
    const db = req.app.get("db");
    let { user } = req.params;

    db.searchUser([`${user}%`]).then(user => {
      res.status(200).send(user);
    });
  },

  followUser: (req, res, next) => {
    const db = req.app.get("db");
    const { userID } = req.params;
    const { followID } = req.body;

    db.followUser([userID, followID]).then(user => {
      res.status(200).send(user);
    });
  },

  unfollowUser: (req, res, next) => {
    const db = req.app.get("db");
    const { userID, unfollowID } = req.params;

    db.unfollowUser([userID, unfollowID]).then(() => {
      db.getFollowing([userID])
        .then(friends => {
          return Promise.all(
            friends.map(({ friend_id }) => db.getTimelinePosts(friend_id))
          );
        })
        .then(timelinePosts => {
          res.status(200).send(timelinePosts);
        });
    });
  }
};
