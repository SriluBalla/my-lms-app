import React from "react";
import "../../styles/forms/TextInput.css"; // optional for styling

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
    <div className="form-field">
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
        maxLength={maxLength}
        className={error ? "input-error" : ""}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TextInput;
