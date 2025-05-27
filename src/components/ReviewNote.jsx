// components/ReviewNote.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import "../styles/main.css";

const ReviewNote = () => {
  const [note, setNote] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchNoteAndStatus = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) return;

      // Get profile status
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("profile_status")
        .eq("id", user.id)
        .single();

      if (profileError || !profile || profile.profile_status !== "flagged") {
        setStatus(profile?.profile_status || "unknown");
        return; // Don't fetch note if not flagged
      }

      setStatus("flagged");

      // Fetch latest review note
      const { data, error } = await supabase
        .from("profile_review_notes")
        .select("note_text, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setNote(data.note_text);
      }
    };

    fetchNoteAndStatus();
  }, []);

  if (status !== "flagged" || !note) return null;

  return (
    <div className="review-note msg-info">
      <p>To display this publicly in the Member Profiles section, please address the following issues:</p>
      <p><strong>⚠️ Flagged:</strong>  {note} </p>
    </div>
  );
};

export default ReviewNote;
