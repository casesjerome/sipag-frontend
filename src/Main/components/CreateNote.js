import React, { useCallback, useState } from "react";

import Input, { resetValues } from "../../shared/components/FormElements/Input";

export default function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  //Input Handler
  const inputHandler = useCallback((name, value) => {
    setNote((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }, []);

  //On Form Submit
  function submitForm(e) {
    e.preventDefault();
    props.onAdd(note);
    setNote({ title: "", content: "" });
    resetValues();
  }

  return (
    <div className="container mt-5">
      <form autoComplete="off" onSubmit={submitForm}>
        <Input
          type="text"
          name="title"
          placeholder="Subject"
          elementType="input"
          onInput={inputHandler}
          isRequired={true}
        />
        <Input
          name="content"
          placeholder="Content"
          elementType="textarea"
          onInput={inputHandler}
          isRequired={false}
        />
        <button type="submit" className="btn btn-dark mt-2">
          Add
        </button>
      </form>
    </div>
  );
}
