import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="login-bg">
          <form>
            <h1>Join the sounds!</h1>
            <div className="login-fg">
              <div className="button">
                <a href="http://localhost:3001/login" className="login-btn">
                  <p className="login-btn-text">Log In</p>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
