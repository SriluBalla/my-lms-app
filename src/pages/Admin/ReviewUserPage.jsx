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
    (async function fetchPending() {
      const { data, error } = await supabase
        .from("user_admin_view")
        .select("*")
        .eq("profile_status", "pending");
      if (error) setMessage({ type: "error", text: error.message });
      else setUsers(data.map(u => ({ ...u, flagNote: "" })));
      setLoading(false);
    })();
  }, []);

  const handleFlagUser = async (userId, noteText) => {
    // as existing handleFlagUser logic
  };

  const updateProfileStatus = async (userId, status) => {
    // as before
  };

  return (
    <Layout title="Profile Review" description="Review pending profiles">
      <Msg_in_Body {...message} />
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No profiles need review 🎉</p>
      ) : (
        users.map(user => (
          <div key={user.user_id} className="review-card">
            <SavedProfileCard profile={user} />
            <RichTextEditor
              value={user.flagNote}
              onChange={val => {
                setUsers(us =>
                  us.map(u =>
                    u.user_id === user.user_id
                      ? { ...u, flagNote: val }
                      : u
                  )
                );
              }}
              placeholder="Reason for requiring correction"
              maxLength={200}
            />
            <ButtonAction
              label="Corrections Needed"
              onClick={() => handleFlagUser(user.user_id, user.flagNote)}
              className="flagged"
            />
            <ButtonAction
              label="Approve"
              onClick={() => updateProfileStatus(user.user_id, "approved")}
              className="approve"
            />
          </div>
        ))
      )}
    </Layout>
  );
};

export default ReviewUserPage;
