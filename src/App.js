import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllPosts } from "./ducks/reducers/reducer";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import routes from "./routes";
import "./reset.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="body">
          <NavBar />
          {routes}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { getAllPosts }
  )(App)
);
