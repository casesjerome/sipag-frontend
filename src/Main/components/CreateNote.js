import React, { useCallback, useState } from "react";

import Input from "../../shared/components/FormElements/Input";

export default function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  //Input Handler
  const createNoteInputHandler = useCallback((name, value) => {
    setNote((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }, []);

  //On Form Submit
  function createNoteSubmitHandler(e) {
    e.preventDefault();
    props.onAdd(note);
  
  }

  return (
    <div className="container mt-5">
      <form autoComplete="off" onSubmit={createNoteSubmitHandler}>
        <Input
          type="text"
          name="title"
          placeholder="Subject"
          elementType="input"
          onInput={createNoteInputHandler}
          isRequired={true}
        />
        <Input
          name="content"
          placeholder="Content"
          elementType="textarea"
          onInput={createNoteInputHandler}
          isRequired={false}
        />
        <button type="submit" className="btn btn-dark mt-2">
          Add
        </button>
      </form>
    </div>
  );
}
