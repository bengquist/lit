import React from "react";
import classnames from "classnames";

const TextFieldGroup = props => {
  const { value, label, error, type, onChange, field } = props;
  console.log(props);

  return (
    <div className={classnames("user", { "has-error": error })}>
      <label>{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={field}
        className="form-input"
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default TextFieldGroup;
