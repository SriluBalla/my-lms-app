import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import Msg_in_Body from "../../Message/Msg_in_Body";
import ButtonSubmit from "../../Button/ButtonSubmit";
import "../../../styles/main.css";

export default function GradeCheckbox({ chapterId }) {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    async function fetchApprovedQuestions() {
      if (!chapterId) {
        setQuestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("qa_checkbox")
        .select("*")
        .eq("chapter_id", chapterId)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (error) {
        setMessage({
          type: "error",
          text: "Failed to load approved questions.",
        });
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
          return { ...q, options };
        });
        setQuestions(transformed);
        setMessage({ type: "", text: "" });
      }
    }

    fetchApprovedQuestions();
  }, [chapterId]);

  const handleToggle = (questionId, optionId) => {
    if (submitted[questionId]) return;

    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const handleSubmit = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const correctIds = question.options
      .filter((opt) => opt.is_correct)
      .map((opt) => opt.id);

    const selected = selectedAnswers[questionId] || [];

    // Show info message if no answer selected
    if (selected.length === 0) {
      setResults((prev) => ({
        ...prev,
        [questionId]: "ℹ️ Please answer the question",
      }));
      return;
    }

    const isCorrect =
      selected.length === correctIds.length &&
      selected.every((id) => correctIds.includes(id));

    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    setResults((prev) => ({
      ...prev,
      [questionId]: isCorrect ? "✅ Correct!" : "❌ Incorrect.",
    }));
  };

  return (
    <div className="grade-question-wrapper">
      <Msg_in_Body type={message.type} text={message.text} />

      {questions.map((q) => (
        <div key={q.id} className="card-qst bBlue-bgBlue">
          <p className="qst-head">{q.question_text}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(q.id);
            }}
            className="grade-form"
          >
            <ul className="bullet-no">
              {q.options.map((opt) => (
                <li key={opt.id}>
                  <span>
                    <input
                      className="check-grade"
                      type="checkbox"
                      disabled={submitted[q.id]}
                      checked={
                        selectedAnswers[q.id]?.includes(opt.id) || false
                      }
                      onChange={() => handleToggle(q.id, opt.id)}
                    />
                    <p className="qst-opt">{opt.option_text}</p>
                  </span>
                </li>
              ))}
            </ul>

            {!submitted[q.id] && (
              <div className="center">
                <ButtonSubmit
                  type="submit"
                  data-testid="submitAnswer"
                  label="Submit Answer"
                />
              </div>
            )}

            {submitted[q.id] && (
              <Msg_in_Body
                type={results[q.id]?.includes("Correct") ? "success" : "error"}
                text={results[q.id]}
              />
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
