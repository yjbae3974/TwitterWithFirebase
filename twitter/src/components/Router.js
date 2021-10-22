import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
export default function AppRouter(props) {
  return (
    <Router>
      {props.isLoggedIn && (
        <Navigation refreshUser={props.refreshUser} userObj={props.userObj} />
      )}
      <Switch>
        {props.isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={props.userObj}></Home>
            </Route>
            <Route exact path="/profile">
              <Profile
                refreshUser={props.refreshUser}
                userObj={props.userObj}
              ></Profile>
            </Route>
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth></Auth>
            </Route>
          </>
        )}
        ;
      </Switch>
    </Router>
  );
}
//<Redirect from="*" to="/" />이걸 위 아래에다가 넣어도 됨.
