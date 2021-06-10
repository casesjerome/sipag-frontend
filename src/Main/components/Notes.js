import React from "react";

export default function Notes(props) {
  return (
    <div className="col">
      <div className="card mt-2">
        <div className="card-body">
          <h5 className="card-title">{props.title} </h5>
          <p className="card-text">{props.content}</p>
          <button
            className="btn btn-outline-dark btn-sm float-end"
            onClick={() => props.onDelete(props.id, props.noteId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
