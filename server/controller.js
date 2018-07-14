const _ = require("lodash");

module.exports = {
  getProfilePosts: (req, res, next) => {
    const db = req.app.get("db");
    const { userID } = req.params;
    console.log(userID);

    db.getAllPosts([userID]).then(posts => {
      res.status(200).send(posts);
    });
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
    let timelinePosts = [];

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

  addUser: (req, res, next) => {
    const db = req.app.get("db");
    const { name, email, profileImg } = req.body;

    db.users.where("email=$1", [email]).then(user => {
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
    });
  },

  searchUsers: (req, res, next) => {
    const db = req.app.get("db");
    let { user } = req.params;
    let newUser = user.charAt(0).toUpperCase() + user.slice(1) + "%";

    db.searchUser([newUser]).then(user => {
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
  }
};
