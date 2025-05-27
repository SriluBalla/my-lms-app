import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: roleData } = await supabase
          .from("user_role_assignments")
          .select("role")
          .eq("user_id", user.id)
          .single();
        setRole(roleData?.role || "user");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user || (allowedRoles.length && !allowedRoles.includes(role))) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
