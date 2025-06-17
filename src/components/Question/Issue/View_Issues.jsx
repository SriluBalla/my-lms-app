import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseDB";
import DOMPurify from "dompurify";
import RichTextEditor from "../../../components/Input/Input_RichTextEditor";
import ButtonAction from "../../../components/Button/ButtonAction";
import Msg_in_Body from "../../../components/Message/Msg_in_Body";
import "../../../styles/main.css";

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviewNote, setReviewNote] = useState("");

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

      const uniqueUserIds = [
        ...new Set(fetchedIssues.map((i) => i.created_by)),
      ];

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name")
        .in("id", uniqueUserIds);

      if (profilesError) console.error(profilesError);
      else {
        const map = {};
        profiles.forEach((p) => {
          map[p.id] = `${p.first_name} ${p.last_name}`;
        });
        setProfilesMap(map);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return "";
    const { data } = supabase.storage
      .from("qa_issues.issue_image_url")
      .getPublicUrl(path);
    return data?.publicUrl || "";
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "—");

  if (loading) return <p>Loading data…</p>;

  const renderField = (label, value) => (
    <tr>
      <th>{label}</th>
      <td>{value || "—"}</td>
    </tr>
  );

  const renderDescription = (label, htmlContent) => (
    <tr>
      <th>{label}</th>
      <td>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(htmlContent),
          }}
        />
      </td>
    </tr>
  );

  const updateApproval = async (status) => {
    if (status === "declined" && !reviewNote?.trim()) {
      setNoteError(true);
      return;
    }

    const { data: authData } = await supabase.auth.getUser();
    const reviewer = authData?.user;

    if (!reviewer) {
      setMessage({ type: "error", text: "Reviewer not authenticated." });
      return;
    }

    if (status === "declined") {
      const { error: insertError } = await supabase
        .from("profile_review_notes")
        .insert([
          {
            user_id: issue.created_by,
            reviewer_id: reviewer.id,
            note_text: reviewNote,
          },
        ]);

      if (insertError) {
        setMessage({
          type: "error",
          text: `Note save failed: ${insertError.message}`,
        });
        return;
      }
    }

    const { error: updateError } = await supabase
      .from("qa_issues")
      .update({
        approved: status === "approved",
        approved_by: reviewer.id,
        approved_at: new Date().toISOString(),
      })
      .eq("id", issues.id);

    if (updateError) {
      setMessage({ type: "error", text: "Failed to update issue status." });
      return;
    }

    setMessage({ type: "success", text: `✅ Issue ${status}` });
  };

  return (
    <div className="issue-list-container">
      {issues.length === 0 ? (
        <p>No issues submitted yet.</p>
      ) : (
        issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <table className="data-table">
              <tbody>
                {renderField("Title", issue.title)}
                
                {renderField("Severity", issue.severity)}
                {renderField("Status", issue.status)}
                {renderField("Environment", issue.environment)}
                {renderField("Browser", issue.browser)}
                {renderField("OS", issue.os)}
                {renderField("Assigned To", issue.assigned_to)}
                {renderField("Reported By", profilesMap[issue.created_by])}
                {renderField(
                  "Created At",
                  new Date(issue.created_at).toLocaleString()
                )}
                {renderField("Actual Result", issue.actual_result)}
                {renderField("Expected Result", issue.expected_result)}
                {renderDescription("Description", issue.description)}
              </tbody>
            </table>

            {issue.issue_image_url && (
              <div className="image-preview">
                <img src={getImageUrl(issue.issue_image_url)} alt="Issue" />
              </div>
            )}

            {/* <div className="review-section">
              <RichTextEditor
                height="150px"
                value={reviewNote}
                onChange={(val) => {
                  setReviewNote(val);
                  setNoteError(false);
                }}
                placeholder="Enter note if declining the issue"
              />
              {noteError && (
                <Msg_in_Body type="info" text="Note required when declining." />
              )}
            </div> */}

            <div className="action-buttons">
              <ButtonAction
                id="btnApprove"
                data-testid="btnApprove"
                type="button"
                label="Approve"
                className="approve"
                onClick={() => updateApproval("approved")}
              />
              <ButtonAction
                id="btnDecline"
                data-testid="btnDecline"
                type="button"
                label="Decline"
                className="flagged"
                onClick={() => updateApproval("declined")}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewIssues;
