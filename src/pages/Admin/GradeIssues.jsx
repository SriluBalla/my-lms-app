import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseDB";
import IssueCard from "../../components/Question/Issue/Comp_Issue";
import Msg_in_Body from "../../components/Message/Msg_in_Body";


const Grade_Issue = () => {
  const [issues, setIssues] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return setLoading(false);

      // Fetch only unapproved issues
      const { data: issuesRaw, error: issueError } = await supabase
        .from("qa_issues")
        .select("*")
        .or("approved.is.null,approved.eq.false")
        .order("created_at", { ascending: false });

      if (issueError) {
        console.error("❌ Error loading issues:", issueError.message);
        setLoading(false);
        return;
      }

      const creatorIds = issuesRaw.map((i) => i.created_by);
      const { data: creators } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", creatorIds);

      const map = {};
      creators.forEach((c) => (map[c.id] = `${c.first_name} ${c.last_name}`));

      setProfilesMap(map);
      setIssues(issuesRaw);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleReview = async (issueId, status, noteText) => {
    const { data: authData } = await supabase.auth.getUser();
    const reviewer = authData?.user;
    if (!reviewer) return;

    if (status === "approved") {
      await supabase
        .from("qa_issues")
        .update({
          approved: true,
          approved_by: reviewer.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", issueId);
    }

    if (status === "declined") {
      await supabase.from("qa_issues_review_notes").insert([
        {
          issue_id: issueId,
          notes_text: noteText,
          created_by: reviewer.id,
          reviewed_by: reviewer.id,
          created_at: new Date().toISOString(),
        },
      ]);

      await supabase
        .from("qa_issues")
        .update({ approved: false })
        .eq("id", issueId);
    }

    setMessage({ type: "success", text: `✅ Issue ${status}` });

    setIssues((prev) => prev.filter((i) => i.id !== issueId));
  };

  if (loading) return <p>Loading reviewable issues…</p>;

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

export default Grade_Issue;
