import React from "react";

const Label = (props) => {
  return (
    <label htmlFor={props.id} style={{ display: props.display }}>
      {props.label}
    </label>
  );
};

export default Label;
