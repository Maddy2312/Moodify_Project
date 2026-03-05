import React from "react";

const InputFeild = ({name, placeholder, value, onChange}) => {
  return (
    <input value={value} onChange={onChange}
      className="bg-zinc-900 p-4 rounded-2xl text-white"
      type="text"
      name={name}
      placeholder={placeholder}
    />
  );
};

export default InputFeild;
