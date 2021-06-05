import React, { useState } from "react";

export default function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(e) {
    e.preventDefault();
    props.onAdd(note);
    setNote({ title: "", content: "" });
  }

  return (
    <div className="container mt-5">
      <form autoComplete="off">
        <input
          name="title"
          value={note.title}
          type="text"
          placeholder="Subject"
          className="form-control"
          onChange={changeHandler}
        />
        <textarea
          name="content"
          value={note.content}
          placeholder="My Notes"
          className="form-control"
          rows="3"
          onChange={changeHandler}
        />
        <button onClick={submitNote} className="btn btn-dark mt-2">
          Add
        </button>
      </form>
    </div>
  );
}
