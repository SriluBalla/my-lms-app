import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseDB";
import DOMPurify from "dompurify";
import "../../../styles/main.css";

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;
      if (!user) return setLoading(false);

      const { data: fetchedIssues, error: issuesError } = await supabase
        .from("qa_issues")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (issuesError) console.error(issuesError);
      else setIssues(fetchedIssues);

      const uniqueUserIds = [...new Set(fetchedIssues.map(i => i.created_by))];

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", uniqueUserIds);

      if (profilesError) console.error(profilesError);
      else {
        const map = {};
        profiles.forEach(p => {
          map[p.id] = `${p.first_name} ${p.last_name}`;
        });
        setProfilesMap(map);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "—");

  if (loading) return <p>Loading data…</p>;

  return (
    <div className="issue-list-container">
      <h2>Your Submitted Issues</h2>
      {issues.length === 0 ? (
        <p>No issues submitted yet.</p>
      ) : (
        issues.map(issue => (
          <div key={issue.id} className="issue-card">
            <h3>{issue.title}</h3>
            <div>
              <label>Reported by:</label>{" "}
              <span>{profilesMap[issue.created_by] || "—"}</span>
            </div>
            <div className="rendered-description">
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(issue.description),
                }}
              />
            </div>
            {/* ...rest of your fields... */}

            <p><strong>Created At:</strong> {formatDate(issue.created_at)}</p>

            {/* ...approved fields... */}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewIssues;
