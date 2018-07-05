const Validator = require("validator");
const bcrypt = require("bcrypt");

const _ = require("lodash");

const validateInput = data => {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } else if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation is required";
  } else if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords do not match";
  } else if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else {
    errors = {};
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};

module.exports = {
  getAllPosts: (req, res, next) => {
    const db = req.app.get("db");

    db.getAllPosts().then(posts => {
      res.status(200).send(posts);
    });
  },

  addToProfile: (req, res, next) => {
    const db = req.app.get("db");

    const { album, artist, uri } = req.body;

    db.addToProfile([uri, artist, album]).then(posts => {
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
    const { errors, isValid } = validateInput(req.body.userInfo);

    if (isValid) {
      const { username, password, email } = req.body.userInfo;
      const password_digest = bcrypt.hashSync(password, 10);

      db.addUser([email, username, password_digest]).then(users => {
        res.status(200).send({ success: true });
      });
    } else {
      res.status(200).json(errors);
    }
  }
};
