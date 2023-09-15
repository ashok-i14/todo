import classNames from "classnames";
import React from "react";

const InputField = ({
  name,
  value,
  placeholder,
  onChange,
  errorMessage,
  isError = true,
}) => {
  return (
    <div>
      <input
        className={classNames("input", { error: isError })}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => onChange(e)}
      />
      <label className="pl-2 text-red-500">{errorMessage}</label>
    </div>
  );
};

export default InputField;
