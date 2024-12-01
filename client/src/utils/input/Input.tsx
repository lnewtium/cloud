import React from "react";
import "./input.less";

const Input = (props: { value: string, setValue: (value: string) => void, type: string, placeholder: string}) => {
  return (
    <input onChange={(event) => props.setValue(event.target.value)}
           value={props.value}
           type={props.type}
           placeholder={props.placeholder} />
  );
};

export default Input;
