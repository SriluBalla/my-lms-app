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
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        rows={rows}
        className={error ? "error" : ""}
      />
      <p className="char-count">
        {(value?.length || 0)}/{maxLength} characters
      </p>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
