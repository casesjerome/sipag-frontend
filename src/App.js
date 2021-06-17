import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Auth from "./Main/containers/Auth";
import { AuthContext } from "./shared/context/auth-context";
import Navbar from "./shared/components/Navigation/Navbar";
import NoteBoard from "./Main/containers/NoteBoard";

export default function App() {
  const [token, setToken] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const login = useCallback((tkn, userId, username, expirationDate) => {
    setToken(tkn);
    setUserDetails({ _id: userId, username: username });    
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 1440);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: tkn,
        userId: userId,
        username: username,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);
  // const userDetailsHandler = useCallback((userDetailsValue) => {
  //   setUserDetails(userDetailsValue);
  // }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, storedData.userId, storedData.username,new Date(storedData.expiration));
    }
  }, [login]);

  //Routes
  let routes;
  const path = `/${userDetails._id}`;

  if (token) {
    routes = (
      <Switch>
        <Route path={path} exact>
          <NoteBoard />
        </Route>
        <Redirect to={path} /> {/* ToDo: Redirect to /:userid */}
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
        //userDetailsHandler: userDetailsHandler,
      }}
    >
      <Router>
        <Navbar />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}
