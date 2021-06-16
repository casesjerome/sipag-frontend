import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import qs from "qs";

import { AuthContext } from "../../shared/context/auth-context";
import CreateNote from "../components/CreateNote";
import Notes from "../components/Notes";
import LoadingElement from "../../shared/components/UIElements/LoadingElement";

const NoteBoard = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  //Notes
  function getNotes() {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/notes/all/${auth.userDetails._id}`, {
        crossdomain: true,
        headers: { Authorization: "Bearer " + auth.token },
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
  }, [auth.token]);

  function addNote(note) {
    let body = qs.stringify({ title: note.title, content: note.content });

    axios
      .post(
        `http://localhost:8080/api/notes/all/${auth.userDetails._id}`,
        body,
        {
          "Content-Type": "application/x-www-form-urlencoded",
          headers: { Authorization: "Bearer " + auth.token },
        }
      )
      .then((response) => {
        getNotes();
      })
      .catch((err) => console.log(err));
  }

  function deleteNote(id, key) {
    axios
      .delete(`http://localhost:8080/api/notes/specific/${key}`, {
        headers: { Authorization: "Bearer " + auth.token },
      })
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
  return (
    <React.Fragment>
      {isLoading && <LoadingElement />}
      <CreateNote onAdd={addNote} />
      {noteMap}
    </React.Fragment>
  );
};

export default NoteBoard;
