import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";
import SavedProfileCard from "../components/ProfileCard";
import ConfirmMessage from "../components/ConfirmMessage";


const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const isProfileRelevant = (user) => {
    return (
      user.first_name ||
      user.last_name ||
      user.preferred_name ||
      user.self_intro ||
      user.profile_img_url
    );
  };

  const updateUserRole = async (userId, roleKey) => {
    const roleId = ROLE_IDS[roleKey];

    const { error } = await supabase
      .from("user_role_assignments")
      .upsert([{ user_id: userId, role_id: roleId }], {
        onConflict: ["user_id"],
      });

    console.log("Role assigned:", { userId, roleKey, roleId });

    if (error) {
      alert(`Error assigning role: ${error.message}`);
    } else {
      {
        successMessage && <p className="success-msg">{successMessage}</p>;
      }
      {
        errorMessage && <p className="error-msg">{errorMessage}</p>;
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, role: roleKey } : user
        )
      );
    }
  };

  const updateProfileStatus = async (userId, status) => {
    const { error } = await supabase
      .from("profiles")
      .update({ profile_status: status })
      .eq("id", userId);

    if (error) {
      alert(`Error updating profile status: ${error.message}`);
    } else {
      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, profile_status: status } : user
        )
      );
    }
  };

  const handleFlagUser = async (userId, noteText) => {
    const {
      data: { user: reviewer },
      error: reviewerError,
    } = await supabase.auth.getUser();

    if (reviewerError || !reviewer) {
      setErrorMessage("Error identifying reviewer.");
      return;
    }

    const { error: noteError } = await supabase
      .from("profile_review_notes")
      .insert([
        {
          user_id: userId,
          reviewer_id: reviewer.id,
          note_text: noteText,
        },
      ]);

    if (noteError) {
      setErrorMessage(`Failed to submit flag note: ${noteError.message}`);
      return;
    }

    await updateProfileStatus(userId, "flagged");
    setSuccessMessage("User flagged and note submitted successfully.");
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

        <section className="heroOne user-management">
          {loading && <p>Loading users...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <table className="user-table">
              <thead>
                <tr>
                  <th className="card user-profile">Profile Updated</th>
                  <th className="btn-approve">Approve</th>
                  <th className="btn-set-role">Set Role</th>
                </tr>
              </thead>
              <tbody className="table">
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>
                      {isProfileRelevant(user) && (
                        <SavedProfileCard profile={user} />
                      )}
                    </td>
                    <td>
                      <textarea
                        id="text-area"
                        placeholder="Reason for flagging..."
                        value={user.flagNote || ""}
                        onChange={(e) =>
                          setUsers((prev) =>
                            prev.map((u) =>
                              u.user_id === user.user_id
                                ? { ...u, flagNote: e.target.value }
                                : u
                            )
                          )
                        }
                        rows={3}
                        className="flag-note-input"
                      />
                      <button
                        className="button flagged"
                        onClick={() =>
                          handleFlagUser(user.user_id, user.flagNote)
                        }
                      >
                        🚫 Flag
                      </button>
                      <button
                        className="button approve"
                        onClick={() =>
                          updateProfileStatus(user.user_id, "approved")
                        }
                      >
                        ✅ Approve
                      </button>
                    </td>
                    <td>
                      {Object.keys(ROLE_IDS).map((role) => (
                        <button
                          key={role}
                          onClick={() => updateUserRole(user.user_id, role)}
                          className={`button ${role}`}
                        >
                          {role.toUpperCase()}
                        </button>
                      ))}
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
