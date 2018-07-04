import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Timeline from "./components/Timeline/Timeline";
import Discover from "./components/Discover/Discover";
import Profile from "./components/Profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Timeline} />
    <Route path="/login" component={Login} />
    <Route path="/discover" component={Discover} />
    <Route path="/profile" component={Profile} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);
