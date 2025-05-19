import React from "react";
import "../styles/TextInput.css";

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  maxLength,
  error,
}) => {
  return (
    <div className="text-field">
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        // minLength={minLength}
        maxLength={maxLength}
        className={error ? "input-error" : ""}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TextInput;
