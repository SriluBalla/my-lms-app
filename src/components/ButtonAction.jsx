import React from "react";
import PropTypes from "prop-types";

const ButtonAction = ({
  id,
  label,
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
  loadingLabel = "Loading...",
}) => {
  return (
    <button
      id={id}
      data-testid={id}
      className={`button ${className}`.trim()}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
};

ButtonAction.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingLabel: PropTypes.string,
};

export default ButtonAction;
