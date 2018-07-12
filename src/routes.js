import React from "react";
import { Route, Switch } from "react-router-dom";
import Timeline from "./components/Timeline/Timeline";
import Discover from "./components/Discover/Discover";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Timeline} />
    <Route path="/discover" component={Discover} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
