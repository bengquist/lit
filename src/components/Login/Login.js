import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-bg">
          <h1 className="login-logo">
            l
            <i className="fas fa-fire" />
            t
          </h1>
          <a href={process.env.REACT_APP_SECRET} className="login-btn">
            <p className="login-btn-text">Log In</p>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
