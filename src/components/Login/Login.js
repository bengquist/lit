import React, { Component } from "react";
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
                <a href="http://localhost:3001/login" className="submit-btn">
                  It's Lit!
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
