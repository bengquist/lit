const Validator = require("validator");
const _ = require("lodash");

const validateInput = data => {
  let errors = {};

  if (Validator.isEmpty(data.userInfo.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.userInfo.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.userInfo.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.userInfo.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation is required";
  }
  if (
    !Validator.equals(
      data.userInfo.password,
      data.userInfo.passwordConfirmation
    )
  ) {
    errors.passwordConfirmation = "Passwords do not match";
  }
  if (Validator.isEmpty(data.userInfo.username)) {
    errors.username = "Username is required";
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
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json(errors);
    }
  }
};
