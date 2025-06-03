// components/ButtonSubmit.jsx
import React from "react";

const ButtonSubmit = ({ id, label, testId, disabled }) => {
  return (
    <button
      id={id}
      data-testid={testId || id}
      type="submit"
      className="button"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonSubmit;
