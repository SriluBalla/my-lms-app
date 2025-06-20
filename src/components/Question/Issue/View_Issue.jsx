import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseDB";
import IssueCard from "./Comp_Issue";
import Msg_in_Body from "../../Message/Msg_in_Body";

const ViewIssue = () => {
  const [issues, setIssues] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  useEffect(() => {
    const loadData = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return setLoading(false);

      const userId = authData.user.id;

      // Fetch user's issues
      const { data: issuesRaw } = await supabase
        .from("qa_issues")
        .select("*")
        .eq("created_by", userId)
        .order("created_at", { ascending: false });

      // Fetch review notes only for declined issues
      const { data: notes } = await supabase
        .from("qa_issues_review_notes")
        .select("*")
        .in("issue_id", issuesRaw.map((i) => i.id));

      const notesMap = {};
      notes.forEach((n) => {
        notesMap[n.issue_id] = n;
      });

      const issuesWithNotes = issuesRaw.map((i) => ({
        ...i,
        review_note: notesMap[i.id] || null,
      }));

      // Fetch reviewer profiles
      const reviewerIds = notes.map((n) => n.reviewed_by).filter(Boolean);
      const { data: reviewers } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", reviewerIds);

      const map = {};
      reviewers.forEach((r) => {
        map[r.id] = `${r.first_name} ${r.last_name}`;
      });

      setProfilesMap(map);
      setIssues(issuesWithNotes);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleDelete = async (issueId) => {
    await supabase.from("qa_issues").delete().eq("id", issueId);
    await supabase.from("qa_issues_review_notes").delete().eq("issue_id", issueId);

    setIssues((prev) => prev.filter((i) => i.id !== issueId));
    setMessage({ type: "info", text: "Issue deleted." });
  };

  if (loading) return <p>Loading your issues…</p>;

  return (
    <>
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          profilesMap={profilesMap}
          mode="delete"
          onDelete={() => handleDelete(issue.id)}
        />
      ))}
      {message && <Msg_in_Body type={message.type} text={message.text} />}
    </>
  );
};

export default ViewIssue;
