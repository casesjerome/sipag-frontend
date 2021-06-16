import React from "react";

import "./ErrorModal.css";

const ErrorModal = (props) => {
  return (
    <div className="overlay">
      <div
        className="modal"
        id="errorModal"
        tabIndex="-1"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="errorModalLabel">
                {props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClick}
              ></button>
            </div>
            <div className="modal-body">{props.error}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
