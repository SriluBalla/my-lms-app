import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseDB";

const ButtonNav = ({ id, label, to, action }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (action === "signOut") {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        console.log("✅ Signed out");
        navigate("/", { replace: true }); // ⬅️ navigate instead of window.location
      }
    } else if (to) {
      console.log("➡️ Navigating to:", to);
      navigate(to); // ✅ This now works if you're inside <BrowserRouter>
    }
  };

  return (
    <button id={id} className="button" onClick={handleClick}>
      {label}
    </button>
  );
};

ButtonNav.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  action: PropTypes.string,
};

export default ButtonNav;
