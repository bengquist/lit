import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Timeline from "./components/Timeline/Timeline";
import Discover from "./components/Discover/Discover";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/timeline/recent" component={Timeline} />
    <Route path="/discover" component={Discover} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
