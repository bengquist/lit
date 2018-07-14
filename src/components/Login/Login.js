import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-bg">
          <div className="login">
            <a href="http://localhost:3001/login" className="login-btn">
              <p className="login-btn-text">Log In</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
