import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Auth from "./Main/containers/Auth";
import Navbar from "./shared/components/Navigation/Navbar";
import NoteBoard from "./Main/containers/NoteBoard";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./hooks/auth-hook";

export default function App() {
  const {token, login, logout, userDetails} = useAuth();

  //Routes
  let routes;
  const path = `/${userDetails && userDetails._id}`;

  if (token) {
    routes = (
      <Switch>
        <Route path={path} exact>
          <NoteBoard />
        </Route>
        <Redirect to={path} /> 
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: !!token,
        token: token,
        login: login,
        logout: logout,
        userDetails: userDetails,       
      }}
    >
      <Router>
        <Navbar />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}
