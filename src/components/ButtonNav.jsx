import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseDB";

const ButtonAuth = ({ id, label, to, action }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (action === "signOut") {
      await supabase.auth.signOut();
      navigate("/");
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <button id={id} data-testid={id} className="button" onClick={handleClick}>
      {label}
    </button>
  );
};

ButtonAuth.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  action: PropTypes.string, // e.g., "signOut"
};

export default ButtonAuth;
