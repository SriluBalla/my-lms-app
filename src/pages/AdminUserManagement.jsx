import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";
import SavedProfileCard from "../components/ProfileCard";
import ConfirmMessage from "../components/ConfirmMsg";

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

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
        .select("*")
        .eq("profile_status", "pending");

      if (error) {
        console.error("Error fetching users:", error);
        setMessage({ type: "error", text: error.message });
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

  const updateProfileStatus = async (userId, status) => {
    const userToUpdate = users.find((u) => u.user_id === userId);
    const fullName =
      userToUpdate?.preferred_name ||
      `${userToUpdate?.first_name || ""} ${
        userToUpdate?.last_name || ""
      }`.trim();

    const { error } = await supabase
      .from("profiles")
      .update({ profile_status: status })
      .eq("id", userId);

    if (error) {
      setMessage({
        type: "error",
        text: `Error updating profile status: ${error.message}`,
      });
      console.error("Supabase update error:", error);
      return;
    }

    // Remove the user from UI
    setUsers((prev) => prev.filter((user) => user.user_id !== userId));

    setMessage({
      type: "success",
      text: `✅ Approved ${fullName}`,
    });
  };

  const updateUserRole = async (userId, roleKey) => {
    const roleId = ROLE_IDS[roleKey];

    const { error } = await supabase
      .from("user_role_assignments")
      .upsert([{ user_id: userId, role_id: roleId }], {
        onConflict: ["user_id"],
      });

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

  const handleFlagUser = async (userId, noteText) => {
    console.log("🔧 Entered handleFlagUser", userId, noteText);

    if (!noteText || noteText.trim() === "") {
      console.warn("⚠️ No note text provided. Flagging skipped.");
      setMessage({
        type: "warn",
        text: "Please provide a reason to flag the user.",
      });
      return;
    }

    const { data, error: authError } = await supabase.auth.getUser();
    const reviewer = data?.user;

    if (authError || !reviewer) {
      setMessage({ type: "error", text: "Admin not authenticated." });
      return;
    }

    // 1. Insert note into profile_review_notes
    const { error: insertError } = await supabase
      .from("profile_review_notes")
      .insert([
        {
          user_id: userId,
          reviewer_id: reviewer.id,
          note_text: noteText,
        },
      ]);

    if (insertError) {
      console.error("Insert failed:", insertError);
      setMessage({
        type: "error",
        text: `Flag failed: ${insertError.message}`,
      });
      return;
    }

    // 2. Update profile_status to 'flagged'
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_status: "flagged" })
      .eq("id", userId);

    if (updateError) {
      console.error("Update failed:", updateError);
      setMessage({
        type: "error",
        text: `Could not update status: ${updateError.message}`,
      });
      return;
    }

    // 3. Update local state to remove user
    const flaggedUser = users.find((u) => u.user_id === userId);
    const displayName =
      flaggedUser?.preferred_name ||
      `${flaggedUser?.first_name || ""} ${flaggedUser?.last_name || ""}`.trim();

    setUsers((prev) => prev.filter((u) => u.user_id !== userId));

    // 4. Show success message
    setMessage({
      type: "success",
      text: `🚩 ${displayName} flagged for review.`,
    });
  };

  return (
    <Layout title="User Management" description="Manage user roles">
      <div className="body__outline">
        <section className="hero__head">
          <h2>View and Edit Users</h2>
          <p>
            Profiles newly created and updated (image, name, Bio) show up in
            this list. <br />
            Minimum requirement for approval of a user is First name and Last name. <br />
            Make sure the profile picture is of the author's. <br />
            Inappropriate images will have to be flagged / Correction needed. 
            Look for Name (First, Last, Preferred) and Self Intro for any inappropriate content.
            
          </p>
        </section>

        <ConfirmMessage type={message.type} text={message.text} />

        <section className="heroOne user-management">
          {loading && <p>Loading users...</p>}

          {!loading && (
            <table className="user-table">
              <thead>
                <tr>
                  <th className="card user-profile">Profile Updated</th>
                  <th className="btn-approve">Approve</th>
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
                        placeholder="Reason for flagging should be mentioned"
                        required={true}
                        maxLength={100}
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
                        onClick={() => {
                          console.log("🚩 Flag clicked for:", user.user_id);
                          handleFlagUser(user.user_id, user.flagNote);
                        }}
                      >
                        Corrections Needed
                      </button>

                      <button
                        className="button approve"
                        onClick={() =>
                          updateProfileStatus(user.user_id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <ConfirmMessage type={message.type} text={message.text} />

                      <h3 className="text-center">Set Role</h3>
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
