import React, { Component } from "react";
import Logo from "../../LogoMakr_20SyeD.png";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-toggle">
          <a href={process.env.REACT_APP_SECRET}>
            <p>
              l
              <i className="fas fa-fire" />
              t
            </p>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
