import React from "react";
import { Route, Switch } from "react-router-dom";
import Timeline from "./components/Timeline/Timeline";
import Discover from "./components/Discover/Discover";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/home/" component={Timeline} />
    <Route path="/home/discover" component={Discover} />
    <Route path="/home/profile" component={Profile} />
  </Switch>
);
