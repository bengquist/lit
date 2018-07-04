const Validator = require("validator");
const _ = require("lodash");

const validateInput = data => {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "Password confirmation is required";
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords do not match";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};

export default validateInput;
