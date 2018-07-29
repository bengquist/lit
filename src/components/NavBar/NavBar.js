import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./NavBar.css";

class NavBar extends Component {
  state = {
    timeline: true,
    discover: false
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
    return (
      <div className="navbar">
        <div className="logo">
          <Link onClick={() => this.clickActive(1)} to="/">
            <i className="fas fa-fire" />
          </Link>
        </div>
        <div className="header">
          <Link onClick={() => this.clickActive(3)} to="/profile">
            <img className="profile_img" src={this.props.profileImg} />
          </Link>
        </div>
        <div className="links">
          <Link
            className={classnames(null, {
              active: this.state.discover
            })}
            onClick={() => this.clickActive(1)}
            to="/"
          >
            <i className="fas fa-globe" /> <span>Timeline</span>
          </Link>
        </div>
        <div className="links">
          <Link
            className={classnames(null, {
              active: this.state.timeline
            })}
            onClick={() => this.clickActive(2)}
            to="/discover"
          >
            <i className="fas fa-sliders-h" /> <span>Discover</span>
          </Link>
        </div>
        <div className="logout">
          <a href={process.env.REACT_APP_LOGOUT} className="logout-btn">
            Log Out
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
