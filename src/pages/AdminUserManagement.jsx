import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ROLE_IDS = {
    user: "c1e95deb-5e76-41bc-ac9f-fbcc45d2f56f",
    leader: "6d905dcd-59f1-4eb9-87f7-3a6c8127e5bf",
    member: "961b6b00-dd16-470e-b6f9-96145ea113ae",
    admin: "10de0f6f-f05e-4f51-9b38-c18e3c28d2bb",
    superadmin: "975353ef-c35c-4e94-8e36-fafe009e1292",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_admin_view")
        .select("*");

      if (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

 const updateUserRole = async (userId, roleKey) => {
  const roleId = ROLE_IDS[roleKey];

  const { error } = await supabase
    .from("user_role_assignments")
    .upsert([{ user_id: userId, role_id: roleId }], { onConflict: ['user_id'] });

  console.log("Role assigned:", { userId, roleKey, roleId });

  if (error) {
    alert(`Error assigning role: ${error.message}`);
  } else {
    alert(`Assigned ${roleKey} role successfully`);

    setUsers((prev) =>
      prev.map((user) =>
        user.user_id === userId ? { ...user, role: roleKey } : user
      )
    );
  }
};


  return (
    <Layout title="User Management" description="Manage user roles">
      <div className="body__outline">
        <section className="hero__head">
          <h2>View and Edit Users</h2>
          <p>
            <strong>Instructions coming soon</strong>
          </p>
        </section>

        <section className="heroOne">
          {loading && <p>Loading users...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Set Role</th>
                  <th>Country</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody className="comparison-table">
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {Object.keys(ROLE_IDS).map((role) => (
                        <button
                          key={role}
                          onClick={() => updateUserRole(user.user_id, role)}
                          className="small-button"
                        >
                          {role}
                        </button>
                      ))}
                    </td>
                    <td>{user.country || "—"}</td>
                    <td>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default AdminUserManager;
