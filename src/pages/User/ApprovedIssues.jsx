import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../supabaseDB";
import IssueCard from "../../components/Question/Issue/Comp_Issue";
import Msg_in_Body from "../../components/Message/Msg_in_Body";

const ApprovedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const { data: issuesRaw, error: issueError } = await supabase
        .from("qa_issues")
        .select("*")
        .eq("approved", true)
        .order("approved_at", { ascending: false });

      if (issueError) {
        console.error("❌ Error loading approved issues:", issueError.message);
        setLoading(false);
        return;
      }

      const creatorIds = [...new Set(issuesRaw.map((i) => i.created_by))];

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .in("id", creatorIds);

      if (profileError) {
        console.error("❌ Error loading profiles:", profileError.message);
      }

      const profileMap = {};
      profiles?.forEach((p) => {
        profileMap[p.id] = p; // Store full profile
      });

      setProfilesMap(profileMap);
      setIssues(issuesRaw);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p>Loading approved issues…</p>;

  return (
    <Layout title="Approved Issues" description="Approved practice Issues">
      <div className="body__outline">
        <section className="heading">
          <h2>Approved issues for reference</h2>
        </section>
        <div className="approved-issues">
          {issues.length === 0 ? (
            <p>No approved issues yet.</p>
          ) : (
            issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                mode="public"
                profilesMap={profilesMap}
              />
            ))
          )}
          {message && <Msg_in_Body type={message.type} text={message.text} />}
        </div>
      </div>
    </Layout>
  );
};

export default ApprovedIssues;
