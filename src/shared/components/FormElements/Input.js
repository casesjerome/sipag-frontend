import React, { useEffect, useReducer } from "react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
      };
    case "RESET":
      return { value: "" };
    default:
      return state;
  }
};

export let resetValues;

const Input = (props) => {
  //State Initialization
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
  });

  //Reset Values
  const resetInput = () => {
    dispatch({ type: "RESET" });
  };

  resetValues = resetInput;

  //Return Values
  const { onInput, name } = props;
  const { value } = inputState;

  useEffect(() => {
    onInput(name, value);
  }, [onInput, name, value]);

  //On Change Handler
  const changeHandler = (e) => {
    const { value } = e.target;
    dispatch({ type: "CHANGE", val: value });
  };

  //Element Type
  const element =
    props.elementType === "input" ? (
      <input
        id={props.id}
        className={`form-control ${props.className}}`}
        style={props.style}
        name={name}
        value={inputState.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        required={props.isRequired}
        type={props.type}
      />
    ) : (
      <textarea
        id={props.id}
        className={`form-control ${props.className}}`}
        style={props.style}
        name={name}
        value={inputState.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        required={props.isRequired}
        rows={props.rows || "3"}
      />
    );
  return (   
       element  
  );
};

/* INPUT PROPERTIES
*id
*elementType
*className
*style
*name
*type
*placeholder
*value
*isRequired
textarea *rows
*/
export default Input;
