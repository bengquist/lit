import React, { Component } from "react";
import { connect } from "react-redux";
import { userSignupRequest } from "../../ducks/reducers/reducer";
import axios from "axios";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: ""
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  };

  render() {
    return (
      <div className="sign-up">
        <form onSubmit={this.onSubmit} className="sign-up-bg">
          <h1>ABCDEFGHIJK</h1>
          <div className="sign-up-fg">
            <div className="user">
              <label>Username</label>
              <input
                onChange={this.inputHandler}
                value={this.state.username}
                type="text"
                name="username"
              />
            </div>
            <div className="email">
              <label>Username</label>
              <input
                onChange={this.inputHandler}
                value={this.state.email}
                type="text"
                name="email"
              />
            </div>
            <div className="pass">
              <label>Password</label>
              <input
                onChange={this.inputHandler}
                value={this.state.password}
                type="text"
                name="password"
              />
            </div>
            <div className="pass-confirm">
              <label>Password Confirmation</label>
              <input
                onChange={this.inputHandler}
                value={this.state.passwordConfirmation}
                type="text"
                name="passwordConfirmation"
              />
            </div>
            <div className="button">
              <button className="sign-up-btn">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { userSignupRequest }
)(SignUp);
