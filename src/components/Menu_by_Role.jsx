import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseDB";


const MenuItem = ({ to, label, id, roles = [], userRole }) => {

  
  if (!roles.includes(userRole)) return null;

  return (
    <Link id={id} data-testid={id} className="profile-link" to={to}>
      {label}
    </Link>
  );
};

export default MenuItem;
