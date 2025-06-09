import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import ViewMatchColumn from "./View_MatchColumn";
import EditMatchColumn from "./Edit_MatchColumn";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function DeleteMatchColumn({ chapterId, user }) {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editId, setEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [approvedIds, setApprovedIds] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);

  const fetchQuestions = async () => {
    if (!chapterId) {
      setQuestions([]);
      return;
    }

    const { data, error } = await supabase
      .from("qa_matchcolumns")
      .select("*")
      .eq("chapter_id", chapterId)
      .eq("is_approved", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching questions:", error.message);
      setMessage({ type: "error", text: "Failed to load questions." });
      setQuestions([]);
    } else {
      setQuestions(data);
      setMessage({ type: "", text: "" });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [chapterId]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("qa_matchcolumns").delete().eq("id", id);

    if (error) {
      setMessage({ type: "error", text: "Failed to delete question." });
    } else {
      setDeletedIds((prev) => [...prev, id]);
    }
    setConfirmDeleteId(null);
  };

  const handleApprove = async (id) => {
    if (!user?.id) {
      setMessage({ type: "error", text: "User ID missing. Cannot approve." });
      return;
    }

    const { error } = await supabase
      .from("qa_matchcolumns")
      .update({
        is_approved: true,
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      setMessage({ type: "error", text: "Approval failed." });
    } else {
      setApprovedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="view-question-wrapper">
      <Msg_in_Body type={message.type} text={message.text} />

      {questions.length === 0 ? (
        <p>No match column questions found for this chapter.</p>
      ) : (
        questions.map((q) => {
          if (approvedIds.includes(q.id)) {
            return (
              <Msg_in_Body
                key={`approved-${q.id}`}
                type="success"
                text="✅ Match Column question approved successfully."
              />
            );
          }

          if (deletedIds.includes(q.id)) {
            return (
              <Msg_in_Body
                key={`deleted-${q.id}`}
                type="success"
                text="🗑️ Match Column question deleted successfully."
              />
            );
          }

          return editId === q.id ? (
            <EditMatchColumn
              key={q.id}
              question={q}
              onSave={async (updated) => {
                const payload = {
                  question_text: updated.question_text,
                  option_1_a: updated.options[0]?.a,
                  option_1_b: updated.options[0]?.b,
                  option_2_a: updated.options[1]?.a,
                  option_2_b: updated.options[1]?.b,
                  option_3_a: updated.options[2]?.a,
                  option_3_b: updated.options[2]?.b,
                  option_4_a: updated.options[3]?.a,
                  option_4_b: updated.options[3]?.b,
                };

                const { error } = await supabase
                  .from("qa_matchcolumns")
                  .update(payload)
                  .eq("id", updated.id);

                if (error) {
                  setMessage({ type: "error", text: "Failed to update question." });
                } else {
                  setEditId(null);
                  await fetchQuestions();
                  setMessage({
                    type: "success",
                    text: "Question updated successfully!",
                  });
                }
              }}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <div key={q.id}>
              <ViewMatchColumn
                question={q}
                onEdit={() => setEditId(q.id)}
                onDelete={() => setConfirmDeleteId(q.id)}
                onApprove={() => handleApprove(q.id)}
              />

              {confirmDeleteId === q.id && (
                <div className="delete-confirm">
                  <p className="warn">Are you sure you want to delete this question?</p>
                  <div className="center">
                    <ButtonAction
                      type="button"
                      className="flagged"
                      onClick={() => handleDelete(q.id)}
                      data-testid="deleteQuestion"
                      id="deleteQuestion"
                      label="Yes, Delete"
                    />
                    <ButtonAction
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      data-testid="cancelDelete"
                      label="Cancel"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
