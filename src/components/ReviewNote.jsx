// components/ReviewNote.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import "../styles/main.css";

const ReviewNote = () => {
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) return;

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

    fetchNote();
  }, []);

  if (!note) return null;

  return (
    <div className="review-note warning-box">
      <em>To display this publicly in the Member Profiles section, please address the following issues:</em>
      <p><strong>⚠️ Flagged:</strong>  {note} </p>
    </div>
  );
};

export default ReviewNote;
