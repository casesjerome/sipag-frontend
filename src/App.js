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
import { AuthContext } from "./shared/components/context/auth-context";
import Navbar from "./shared/components/Navigation/Navbar";
import CreateNote from "./Main/components/CreateNote";
import Notes from "./Main/components/Notes";

export default function App() {
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
  console.log(userDetails);

  //Notes
  function getNotes() {
    axios
      .get("http://localhost:8080/notes", { crossdomain: true })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addNote(note) {
    let body = qs.stringify({ title: note.title, content: note.content });

    axios
      .post("http://localhost:8080/notes", body, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((response) => {
        getNotes();
      })
      .catch((err) => console.log(err));
  }

  function deleteNote(id, key) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios
      .delete(`http://localhost:8080/notes/${key}`)
      .then((response) => console.log("Note Deleted"))
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
              dbKey={item._id}
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
  //const isLoggedin = false;
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <CreateNote onAdd={addNote} />
          {noteMap}
        </Route>
        <Redirect to="/" /> {/* ToDo: Redirect to /:userid */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
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
