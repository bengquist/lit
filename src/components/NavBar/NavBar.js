import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    timeline: false,
    discover: true
  };

  clickActive(e) {
    if (e === 2) {
      this.setState({ timeline: true, discover: false });
    } else if (e === 1) {
      this.setState({ timeline: false, discover: true });
    } else {
      this.setState({ timeline: false, discover: false });
    }
  }

  render() {
    let discoverLink = classnames("fas fa-globe", {
      active: this.state.discover
    });
    let timelineLink = classnames("fas fa-sliders-h", {
      active: this.state.timeline
    });

    return (
      <div className="navbar">
        <div className="logo">
          <Link onClick={() => this.clickActive(1)} to="/">
            <h1>
              l
              <i className="fas fa-fire" />
              t
            </h1>
          </Link>
        </div>
        <div className="header">
          <Link onClick={() => this.clickActive(3)} to="/profile">
            <img
              className="profile_img"
              src={this.props.profileImg}
              alt="Profile Img"
            />
          </Link>
        </div>
        <div className="links">
          <Link onClick={() => this.clickActive(1)} to="/">
            <i className={discoverLink} /> Timeline
          </Link>
        </div>
        <div className="links">
          <Link onClick={() => this.clickActive(2)} to="/discover">
            <i className={timelineLink} /> Discover
          </Link>
        </div>
        <div className="logout">
          <a href="http://localhost:3000/#/Login" className="logout-btn">
            Log Out
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
