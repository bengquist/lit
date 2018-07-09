const _ = require("lodash");

module.exports = {
  getAllPosts: (req, res, next) => {
    const db = req.app.get("db");
    const { userID } = req.params;
    console.log(userID);

    db.getAllPosts().then(posts => {
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

    const { id } = req.params;

    db.deleteFromProfile([id]).then(posts => {
      res.status(200).send(posts);
    });
  },

  editProfilePost: (req, res, next) => {
    const db = req.app.get("db");

    const { id } = req.params;
    const { comment } = req.body;

    db.editProfilePost([id, comment]).then(posts => {
      res.status(200).send(posts);
    });
  },

  addUser: (req, res, next) => {
    const db = req.app.get("db");
    const { name, email, profileImg } = req.body;

    db.users.where("email=$1", [email]).then(user => {
      if (!_.isEmpty(user)) {
        console.log("logged " + user);
        db.getUser([email]).then(user => {
          res.status(200).send(user);
        });
      } else {
        db.addUser([email, name, profileImg]).then(user => {
          console.log("adding " + user);
          res.status(200).send(user);
        });
      }
    });
  }
};
