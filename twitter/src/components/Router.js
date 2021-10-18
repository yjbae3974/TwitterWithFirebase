import React, { useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
export default function AppRouter(props) {
  
  return (
    <Router>
        {props.isLoggedIn && <Navigation />}
      <Switch>
        {props.isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path ="/profile">
                <Profile></Profile>
            </Route>
            
          </>
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