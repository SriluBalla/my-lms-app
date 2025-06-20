import React, { useState } from "react";
import DOMPurify from "dompurify";
import RichTextEditor from "../../Input/Input_RichTextEditor";
import ButtonAction from "../../Button/ButtonAction";
import { supabase } from "../../../supabaseDB";
import SavedProfileCard from "../../SQL/Card_Profile";
import "../../../styles/main.css";
import "../../../styles/Issues.css";

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage.from("qa-issue-images").getPublicUrl(path);
  return data?.publicUrl || "";
}

const IssueCard = ({
  issue,
  profilesMap = {},
  mode, // "view", "grade", or "delete"
  onDelete,
  onReview, // (issueId, status, note)
}) => {
  const [reviewNote, setReviewNote] = useState(
    issue.review_note?.notes_text || ""
  );

  const imageUrl = getImageUrl(issue.issue_image_url);

  const handleApprove = () => onReview(issue.id, "approved", reviewNote);
  const handleDecline = () => onReview(issue.id, "declined", reviewNote);

  const varIssue = (label, value) => (
    <div className="issue-row">
      <div className="issue-label">{label}</div>
      <div className="issue-value">{value || "—"}</div>
    </div>
  );

  return (
    <div className="issue-container">
      <div className="issue-card">
        <h2 className="title bNavy-bgBlue">{issue.title}</h2>
        <div className="description lite-blue">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(issue.description),
            }}
          />
        </div>
        <div className="issue-img blue">
          <img
            src={imageUrl || "/images/issues/img-not-uploaded.png"}
            onError={(e) =>
              (e.target.src = "/images/issues/bad-img-upload.png")
            }
            alt="Issue"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="expected-result bGreen-bgGreen">
          {issue.expected_result}
        </div>
        <div className="actual-result bRed-bgRed">{issue.actual_result}</div>
        <div className="env bPurple-bgViolet">
          {varIssue("Assigned To:", issue.assigned_to)}
          {varIssue(
            "Reported By:",
            profilesMap[issue.created_by]?.preferred_name
          )}
          {varIssue("Created At", new Date(issue.created_at).toLocaleString())}
          {varIssue("Severity:", issue.severity)}
          {varIssue("Status:", issue.status)}
          {varIssue("Environment:", issue.environment)}
          {varIssue("Browser:", issue.browser)}
          {varIssue("OS:", issue.os)}
        </div>

        {/* Review Section */}
        <div className="review bPink-bgYellow">
          {mode === "grade" ? (
            <>
              <RichTextEditor
                id="review"
                name="review"
                label="Review Note"
                value={reviewNote}
                onChange={setReviewNote}
                height={150}
                maxLength={100}
                width="80%"
                placeholder="Describe the issue in detail"
                required
              />
              <div style={{ marginTop: 10 }}>
                <ButtonAction
                  id="btn-approve"
                  label="Approve"
                  onClick={handleApprove}
                />
                <ButtonAction
                  id="btn-decline"
                  label="Decline"
                  onClick={handleDecline}
                />
              </div>
            </>
          ) : issue.review_note ? (
            <>
              <strong>Review Comment:</strong>
              <p>{issue.review_note.notes_text}</p>
              {mode === "delete" && (
                <ButtonAction
                  label="Delete"
                  onClick={() => onDelete && onDelete(issue.id)}
                />
              )}
            </>
          ) : mode === "delete" ? (
            <ButtonAction
              id="issue-delete"
              label="Delete"
              onClick={() => onDelete && onDelete(issue.id)}
            />
          ) : mode === "view" ? (
            issue.created_by && profilesMap[issue.created_by] ? (
              <>
                {console.log(
                  "🧪 Profile Object:",
                  profilesMap[issue.created_by]
                )}
                <SavedProfileCard profile={profilesMap[issue.created_by]} />
              </>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
