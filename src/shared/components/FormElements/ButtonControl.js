import React from "react";

const ButtonControl = (props) => {
  switch (props.action) {
    case "deleteAllUserNotes":
      break;
    case "deleteAccount":
      break;

    default:
      break;
  }

  return <button className={props.className}>{props.label}</button>;
};

export default ButtonControl;
