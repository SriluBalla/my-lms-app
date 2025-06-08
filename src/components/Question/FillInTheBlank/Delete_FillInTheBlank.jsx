import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import ViewFillInTheBlank from "./View_FillInTheBlank";
import EditFillInTheBlank from "./Edit_FillInTheBlank";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function DeleteFillInTheBlank({ chapterId, user }) {
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
      .from("qa_fillintheblank")
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
    const { error } = await supabase
      .from("qa_fillintheblank")
      .delete()
      .eq("id", id);

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
      .from("qa_fillintheblank")
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
        <p>No Fill in the Blank questions found for this chapter.</p>
      ) : (
        questions.map((q) => {
          if (approvedIds.includes(q.id)) {
            return (
              <Msg_in_Body
                key={`approved-${q.id}`}
                type="success"
                text="✅ Fill-in-the-Blank question approved successfully."
                duration={-1}
              />
            );
          }

          if (deletedIds.includes(q.id)) {
            return (
              <Msg_in_Body
                key={`deleted-${q.id}`}
                type="success"
                text="🗑️ Fill-in-the-Blank question deleted successfully."
                duration={-1}
              />
            );
          }

          return editId === q.id ? (
            <EditFillInTheBlank
              key={q.id}
              question={q}
              onSave={async (updated) => {
                const payload = {
                  question_text: updated.question_text,
                  option_1: updated.options[0] || null,
                  option_2: updated.options[1] || null,
                  option_3: updated.options[2] || null,
                  option_4: updated.options[3] || null,
                  option_5: updated.options[4] || null,
                };

                const { error } = await supabase
                  .from("qa_fillintheblank")
                  .update(payload)
                  .eq("id", updated.id);

                if (error) {
                  setMessage({
                    type: "error",
                    text: "Failed to update question.",
                  });
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
              <ViewFillInTheBlank
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
