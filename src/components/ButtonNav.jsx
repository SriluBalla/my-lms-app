import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonNav = ({ id, label, to, testId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <button id={id} className="button" data-testid={testId || id} onClick={handleClick}>
      {label}
    </button>
  );
};

export default ButtonNav;
