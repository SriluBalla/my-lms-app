import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseDB";
import Layout from "../../components/Layout";
import SavedProfileCard from "../../components/SQL/Card_Profile";
import RichTextEditor from "../../components/Input/Input_RichTextEditor";
import ButtonAction from "../../components/Button/ButtonAction";
import Msg_in_Body from "../../components/Message/Msg_in_Body";
import "../../styles/main.css";

const ReviewUserPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_admin_view")
        .select("*")
        .eq("profile_status", "pending");

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        const initializedUsers = data.map((u) => ({
          ...u,
          flagNote: "",
          flagError: false,
          approved: false,
        }));
        setUsers(initializedUsers);
      }

      setLoading(false);
    };

    fetchPendingUsers();
  }, []);

  const updateUsersState = (userId, updateFields) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId ? { ...u, ...updateFields } : u
      )
    );
  };

  const handleFlagUser = async (userId, noteText) => {
    if (!noteText?.trim()) {
      updateUsersState(userId, { flagError: true });
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const reviewer = authData?.user;

    if (authError || !reviewer) {
      setMessage({ type: "error", text: "Admin not authenticated." });
      return;
    }

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
      setMessage({
        type: "error",
        text: `Flag failed: ${insertError.message}`,
      });
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ profile_status: "flagged" })
      .eq("id", userId);

    if (updateError) {
      setMessage({
        type: "error",
        text: `Could not update status: ${updateError.message}`,
      });
      return;
    }

    const flaggedUser = users.find((u) => u.user_id === userId);
    const name =
      flaggedUser?.preferred_name ||
      `${flaggedUser?.first_name || ""} ${flaggedUser?.last_name || ""}`.trim();

    setUsers((prev) => prev.filter((u) => u.user_id !== userId));
    setMessage({ type: "success", text: `🚩 ${name} flagged for review.` });
  };

  const updateProfileStatus = async (userId, status) => {
    const user = users.find((u) => u.user_id === userId);
    const fullName =
      user?.preferred_name ||
      `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

    const { error } = await supabase
      .from("profiles")
      .update({ profile_status: status })
      .eq("id", userId);

    if (error) {
      setMessage({
        type: "error",
        text: `Error updating profile: ${error.message}`,
      });
      return;
    }

    updateUsersState(userId, { approved: true });
    setMessage({ type: "success", text: `✅ Approved ${fullName}` });
  };

  return (
    <Layout title="Profile Review" description="Review pending profiles">
      <Msg_in_Body {...message} />

      <section className="hero heading">
        <h2>Approve or Flag - Member Profiles</h2>
        <p>
          <strong>
            Sort and filter by Name, Role, Country, Experience, etc.
          </strong>
        </p>
      </section>

      <section className="member-grid">
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No pending profiles! 🎉</p>
        ) : (
          users.map((user) => (
            <div key={user.user_id} className="member-card review">
              {user.approved ? (
                <Msg_in_Body
                  type="success"
                  text={`✅ ${
                    user.preferred_name || user.first_name
                  } has been approved.`}
                />
              ) : (
                <>
                  <SavedProfileCard profile={user} />

                  <RichTextEditor
                    id={`admin-note-${user.user_id}`}
                    height="200px"
                    value={user.flagNote}
                    onChange={(val) =>
                      updateUsersState(user.user_id, {
                        flagNote: val,
                        flagError: false,
                      })
                    }
                    placeholder="Reason for requiring correction"
                    maxLength={200}
                  />

                  {user.flagError && (
                    <Msg_in_Body type="info" text="This field is required." />
                  )}

                  <div className="action-buttons">
                    <ButtonAction
                      id={`admin-flag-${user.user_id}`}
                      label="Corrections Needed"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFlagUser(user.user_id, user.flagNote);
                      }}
                      className="flagged"
                    />

                    <ButtonAction
                      id={`admin-approve-${user.user_id}`}
                      label="Approve"
                      onClick={() =>
                        updateProfileStatus(user.user_id, "approved")
                      }
                      className="approve"
                    />
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </section>
    </Layout>
  );
};

export default ReviewUserPage;
