import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseDB";
import IssueCard from "./Comp_Issue";
import Msg_in_Body from "../../Message/Msg_in_Body";

const GradeIssue = () => {
  const [issues, setIssues] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  useEffect(() => {
    const loadData = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return setLoading(false);

      const { data: issuesRaw } = await supabase
        .from("qa_issues")
        .select("*")
        .or("approved.is.null,approved.eq.false")
        .order("created_at", { ascending: false });

      const { data: notes } = await supabase
        .from("qa_issues_review_notes")
        .select("*")
        .in("issue_id", issuesRaw.map((i) => i.id));

      const notesMap = {};
      notes.forEach((n) => (notesMap[n.issue_id] = n));

      const issuesWithNotes = issuesRaw.map((i) => ({ ...i, review_note: notesMap[i.id] }));

      const creatorIds = issuesWithNotes.map((i) => i.created_by);
      const { data: creators } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", creatorIds);

      const map = {};
      creators.forEach((c) => (map[c.id] = `${c.first_name} ${c.last_name}`));

      setProfilesMap(map);
      setIssues(issuesWithNotes);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleReview = async (issueId, status, noteText) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const common = {
      issue_id: issueId,
      notes_text: noteText,
      created_by: user.id,
      approved_by: user.id,
      approved_at: status === "approved" ? new Date().toISOString() : null,
      is_approved: status === "approved",
    };
    await supabase.from("qa_issues_review_notes").upsert(common);

    await supabase.from("qa_issues").update({ approved: status === "approved" }).eq("id", issueId);

    setMessage({ type: "success", text: `Issue ${status}!` });
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId ? { ...i, review_note: { ...common } } : i
      )
    );
  };

  if (loading) return <p>Loading…</p>;
  return (
    <>
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          profilesMap={profilesMap}
          mode="grade"
          onReview={handleReview}
        />
      ))}
      {message && <Msg_in_Body type={message.type} text={message.text} />}
    </>
  );
};

export default GradeIssue;
