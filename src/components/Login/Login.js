import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-bg">
          <div className="login">
            <h1>
              l
              <i className="fas fa-fire" />
              t
            </h1>
            <a href={process.env.REACT_APP_SECRET} className="login-btn">
              <p className="login-btn-text">Log In</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
