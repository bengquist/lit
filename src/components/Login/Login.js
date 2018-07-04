import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-bg">
          <form>
            <h1>Join the sounds!</h1>
            <div className="login-fg">
              <div className="user">
                <label>Username</label>
                <input type="text" name="username" />
              </div>
              <div className="pass">
                <label>Password</label>
                <input type="text" name="password" />
              </div>
              <div className="button">
                <button className="submit-btn">Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
