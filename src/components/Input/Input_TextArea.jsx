import React from "react";

const TextAreaInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  maxLength = 1000,
  rows = 6,
  required = false,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        data-testid={name}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        rows={rows}
        required={required}
        className={error ? "error" : ""}
      />
      <br />
      <em>
        {(value?.length || 0)}/{maxLength} characters
      </em>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
