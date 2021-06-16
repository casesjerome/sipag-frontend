import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import axios from "axios";
import qs from "qs";

import Auth from "./Main/containers/Auth";
import { AuthContext } from "./shared/context/auth-context";
import Navbar from "./shared/components/Navigation/Navbar";
import CreateNote from "./Main/components/CreateNote";
import Notes from "./Main/components/Notes";
import LoadingElement from "./shared/components/UIElements/LoadingElement";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [notes, setNotes] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const login = useCallback(() => {
    setIsLoggedin(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedin(false);
  }, []);
  const userDetailsHandler = useCallback((userDetailsValue) => {
    setUserDetails(userDetailsValue);
  }, []);

  //Notes
  function getNotes() {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/notes/all/${userDetails._id}`, {
        crossdomain: true,
      })
      .then((response) => {
        setNotes(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function addNote(note) {
    let body = qs.stringify({ title: note.title, content: note.content });

    axios
      .post(`http://localhost:8080/api/notes/all/${userDetails._id}`, body, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((response) => {
        getNotes();
      })
      .catch((err) => console.log(err));
  }

  function deleteNote(id, key) {
    axios
      .delete(`http://localhost:8080/api/notes/specific/${key}`)
      .then((response) => {
        setNotes((prevNotes) => {
          return prevNotes.filter((noteItem, index) => {
            return index !== id;
          });
        });
      })
      .catch((err) => console.log(err));
  }

  const noteMap = (
    <div className="container mt-5 pt-5">
      <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1">
        {notes.map((item, i) => {
          return (
            <Notes
              id={i}
              key={item._id}
              noteId={item.noteId}
              title={item.title}
              content={item.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );

  //Routes
  let routes;
  const path = `/${userDetails._id}`;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path={path} exact>
          {isLoading && <LoadingElement />}
          <CreateNote onAdd={addNote} />
          {noteMap}
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
        isLoggedin: isLoggedIn,
        login: login,
        logout: logout,
        userDetails: userDetails,
        userDetailsHandler: userDetailsHandler,
      }}
    >
      <Router>
        <Navbar />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}
