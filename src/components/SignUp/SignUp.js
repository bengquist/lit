import React, { Component } from "react";
import { connect } from "react-redux";
import { userSignupRequest } from "../../ducks/reducers/reducer";
import validateInput from "../../Validations/signup";
import TextFieldGroup from "../Common/TextFieldGroup";
import axios from "axios";
import classnames from "classnames";
import "./SignUp.css";
import { spawn } from "child_process";

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    isLoading: false,
    errors: []
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);

    this.setState({ errors: errors, isLoading: false });
    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.isValid()) {
      this.props.userSignupRequest(this.state).then(() => {
        console.log("asdfasdf");
        this.setState({ isLoading: false });
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="sign-up">
        <form onSubmit={this.onSubmit} className="sign-up-bg">
          <h1>ABCDEFGHIJK</h1>
          <div className="sign-up-fg">
            <TextFieldGroup
              error={errors.username}
              label="Username"
              onChange={this.inputHandler}
              value={this.state.username}
              field="username"
              type="username"
            />
            <TextFieldGroup
              error={errors.email}
              label="Email"
              onChange={this.inputHandler}
              value={this.state.email}
              field="email"
              type="email"
            />
            <TextFieldGroup
              error={errors.password}
              label="Password"
              onChange={this.inputHandler}
              value={this.state.password}
              field="password"
              type="password"
            />
            <TextFieldGroup
              error={errors.passwordConfirmation}
              label="Confirm Password"
              onChange={this.inputHandler}
              value={this.state.passwordConfirmation}
              field="passwordConfirmation"
              type="password"
            />
            <div className="button">
              <button disabled={this.state.isLoading} className="sign-up-btn">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  state => state,
  { userSignupRequest }
)(SignUp);
