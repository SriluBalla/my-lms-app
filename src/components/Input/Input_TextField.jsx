import React from "react";
import "../../styles/TextInput.css";
import Msg_in_Body from "../Message/Msg_in_Body"; // ✅ Import

const TextInput = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
  title,
  message = "",
  type = "error", // ✅ used for ConfirmMessage
}) => (
  <div className="text-field">
    <label htmlFor={name}>
      {label}
      {required && <span className="required"> * </span>}
    </label>
    <input
      type="text"
      id={id}
      data-testid={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      title={title}
    />

    {/* ✅ Use ConfirmMessage if message exists */}
    {message && <Msg_in_Body type={type} text={message} />}
  </div>
);

export default TextInput;
