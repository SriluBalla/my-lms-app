import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import ViewCheckbox from "./View_Checkbox";
import EditCheckbox from "./Edit_Checkbox";
import ButtonAction from "../../Button/ButtonAction";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function DeleteCheckbox({ chapterId, user }) {
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
      .from("qa_checkbox")
      .select("*")
      .eq("chapter_id", chapterId)
      .eq("is_approved", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching questions:", error.message);
      setMessage({ type: "error", text: "Failed to load questions." });
      setQuestions([]);
    } else {
      const transformed = data.map((q) => {
        const options = [1, 2, 3, 4, 5]
          .map((i) => {
            const text = q[`option_${i}`];
            const correct = q[`is_correct_${i}`];
            if (!text) return null;
            return {
              id: `opt_${q.id}_${i}`,
              option_text: text,
              is_correct: correct,
            };
          })
          .filter(Boolean);
        return { ...q, checkbox_options: options };
      });
      setQuestions(transformed);
      setMessage({ type: "", text: "" });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [chapterId]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("qa_checkbox").delete().eq("id", id);

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
      .from("qa_checkbox")
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
        <p>No checkbox questions found for this chapter.</p>
      ) : (
        questions.map((q) => {
          if (approvedIds.includes(q.id)) {
            return (
              <Msg_in_Body
                key={`approved-${q.id}`}
                type="success"
                text="✅ Checkbox Question approved successfully."
                duration={-1}
              />
            );
          }
          if (deletedIds.includes(q.id)) {
            return (
              <Msg_in_Body
                key={`deleted-${q.id}`}
                type="success"
                text="🗑️ Checkbox Question deleted successfully."
                duration={-1}
              />
            );
          }

          return editId === q.id ? (
            <EditCheckbox
              key={q.id}
              question={q}
              onSave={async (updated) => {
                const payload = {
                  question_text: updated.question_text,
                };
                updated.options.forEach((opt, index) => {
                  payload[`option_${index + 1}`] = opt.option_text;
                  payload[`is_correct_${index + 1}`] = opt.is_correct;
                });

                const { error } = await supabase
                  .from("qa_checkbox")
                  .update(payload)
                  .eq("id", updated.id);

                if (error) {
                  console.error("Update Error Details:", error);
                  setMessage({
                    type: "error",
                    text: "Failed to update question.",
                  });
                } else {
                  setEditId(null);
                  await fetchQuestions();
                  setMessage({
                    type: "success",
                    text: "Question Updated successfully!",
                  });
                }
              }}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <div key={q.id}>
              <ViewCheckbox
                question={q}
                onEdit={() => setEditId(q.id)}
                onDelete={() => setConfirmDeleteId(q.id)}
                onApprove={handleApprove}
              />
              {confirmDeleteId === q.id && (
                <div className="delete-confirm">
                  <p className="warn">
                    Are you sure you want to delete this question?
                  </p>

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
