import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseDB";
import Layout from "../../components/Layout";
import SavedProfileCard from "../../components/SQL/Card_Profile";
import ButtonAction from "../../components/Button/ButtonAction";
import Msg_in_Body from "../../components/Message/Msg_in_Body";
import "../../styles/main.css";

const AssignRolesPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const ROLE_IDS = {
    user: "c1e95deb-5e76-41bc-ac9f-fbcc45d2f56f",
    member: "961b6b00-dd16-470e-b6f9-96145ea113ae",
    leader: "6d905dcd-59f1-4eb9-87f7-3a6c8127e5bf",
    admin: "10de0f6f-f05e-4f51-9b38-c18e3c28d2bb",
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_admin_view")
        .select("*");

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setUsers(data);
      }

      setLoading(false);
    };

    fetchAllUsers();
  }, []);

  const updateUserRole = async (userId, roleKey) => {
    const roleId = ROLE_IDS[roleKey];

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const currentAdmin = authData?.user;

    const { error } = await supabase.from("user_role_assignments").upsert(
      [
        {
          user_id: userId,
          role_id: roleId,
          role: roleKey,
          assigned_by: currentAdmin?.id || null,
        },
      ],
      { onConflict: ["user_id"] }
    );

    if (error) {
      setMessage({
        type: "error",
        text: `Error assigning role: ${error.message}`,
      });
    } else {
      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, role: roleKey } : user
        )
      );
      setMessage({
        type: "success",
        text: `Role '${roleKey}' assigned successfully.`,
      });
    }
  };

  return (
    <Layout title="Assign Roles" description="Assign roles to all users">
      <Msg_in_Body {...message} />

      <section className="heading">
        <h2>Assign Role to Members</h2>
        <p>
          <strong>
            Sort and filter by Name, Role - User, Member, Leader, Admin, Date
            joined, Country, No. of years in IT
          </strong>
        </p>
      </section>
      <section className="member-grid">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((u) => (
            <div key={u.user_id} className="member-card assign">
              <SavedProfileCard profile={u} />
              <div>
                {Object.entries(ROLE_IDS).map(([role, _id]) => (
                  <ButtonAction
                    id={`assign-${role}`}
                    className={role}
                    key={`role-${role}-${u.user_id}`}
                    label={role.toUpperCase()}
                    onClick={() => updateUserRole(u.user_id, role)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </Layout>
  );
};

export default AssignRolesPage;
