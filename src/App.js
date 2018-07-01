import React, { Component } from "react";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import routes from "./routes";
import "./reset.css";
import "./App.css";

class App extends Component {
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

export default App;
