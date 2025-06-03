import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseDB";

const UserRole = () => {
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const fetchUserRole = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && !userError) {
        const { data: roleData } = await supabase
          .from("user_admin_view")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (roleData) {
          setUserRole(roleData.role);
          // console.log("Fetched user:", user);
          // console.log("Fetched role:", roleData);
        }
      }
    };

    fetchUserRole();
  }, []);

  const ALL_ROLES = ["user", "leader", "member", "admin", "superadmin"];
  const ROLE_INFO = [
    {
      key: "user",
      label: "USER",
      title: "User who has registered and verified their profile",
    },
    {
      key: "leader",
      label: "LEADER",
      title: "Mentor who guides and supports other members",
    },
    {
      key: "member",
      label: "MEMBER",
      title: "Certified QA or Product Owner in Test",
    },
    {
      key: "admin",
      label: "ADMIN",
      title: "Admin with access to member management",
    },
    {
      key: "superadmin",
      label: "SUPERADMIN",
      title: "Full access to everything in the system",
    },
  ];

  return (
    <div className="role-display">
      {ROLE_INFO.map((role, index) => (
        <span
          key={role.key}
          title={role.title}
            data-testid={`role-${role.key}`}
          style={{
            fontWeight: role.key === userRole ? "bold" : "normal",
            marginRight: index < ROLE_INFO.length - 1 ? "0.5rem" : 0,
            cursor: "help",
          }}
        >
          {role.label}
          {index < ROLE_INFO.length - 1 && " | "}
        </span>
      ))}
    </div>
  );
};

export default UserRole;
