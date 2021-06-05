import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import axios from "axios";
import qs from "qs";

import Auth from "./Main/containers/Auth";
import Navbar from "./shared/components/Navigation/Navbar";
import CreateNote from "./Main/components/CreateNote";
import Notes from "./Main/components/Notes";

export default function App() {
  const [notes, setNotes] = useState([
    // {
    //   title: "qoute bites",
    //   content:
    //     "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    // },
  ]);

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

  const isLoggedin = false;

  let routes;

  if (isLoggedin) {
    routes = (
      <Switch>
        <Route path="/:userid" exact>
          <CreateNote onAdd={addNote} />
          {noteMap}
        </Route>
        <Route path="/auth" exact>
          {/* <Auth></Auth> */}
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
    <React.Fragment>
      <Router>
        <Navbar />

        {routes}
      </Router>
    </React.Fragment>
  );

  // return (
  //   <div>
  //     <Header /> <CreateNote onAdd={addNote} />
  //     <div className="container mt-5 pt-5 ">
  //       <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1">
  //         {notes.map((item, i) => {
  //           return (
  //             <Notes
  //               id={i}
  //               key={i}
  //               title={item.title}
  //               content={item.content}
  //               onDelete={deleteNote}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}
