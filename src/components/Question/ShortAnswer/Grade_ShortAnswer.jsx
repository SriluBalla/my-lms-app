import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import Msg_in_Body from "../../Message/Msg_in_Body";
import ButtonSubmit from "../../Button/ButtonSubmit";
import "../../../styles/main.css";

export default function GradeShortAnswer({ chapterId }) {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    async function fetchApprovedQuestions() {
      if (!chapterId) return setQuestions([]);

      const { data, error } = await supabase
        .from("qa_shortanswer")
        .select("*")
        .eq("chapter_id", chapterId)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (error) {
        setMessage({ type: "error", text: "Failed to load questions." });
        return setQuestions([]);
      }

      setQuestions(data);
    }
    fetchApprovedQuestions();
  }, [chapterId]);

  const handleSubmit = (questionId) => {
    const response = (answers[questionId] || "").trim();

    if (!response) {
      setResults((prev) => ({
        ...prev,
        [questionId]: "ℹ️ Please answer the question",
      }));
      return;
    }

    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    setResults((prev) => ({
      ...prev,
      [questionId]: "ℹ️ Thank you for the reply. We will get back to you shortly.",
    }));
  };

  return (
    <div className="grade-question-wrapper">
      <Msg_in_Body type={message.type} text={message.text} />

      {questions.map((q) => (
        <div key={q.id} className="card-qst bPurple-bgViolet">
          <p className="qst-head">{q.question_text}</p>
          <form
            className="grade-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(q.id);
            }}
          >
            <textarea
              className="fill-blank-input"
              rows={5}
              value={answers[q.id] || ""}
              disabled={submitted[q.id]}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
              }
              placeholder="Type your answer here..."
            />

            {!submitted[q.id] && (
              <div className="center">
                <ButtonSubmit
                  type="submit"
                  label="Submit Answer"
                  data-testid="submitShortAnswer"
                />
              </div>
            )}

            {submitted[q.id] && (
              <Msg_in_Body type="info" text={results[q.id]} />
            )}

            {!submitted[q.id] &&
              results[q.id] === "ℹ️ Please answer the question" && (
                <Msg_in_Body type="info" text={results[q.id]} />
              )}
          </form>
        </div>
      ))}
    </div>
  );
}
