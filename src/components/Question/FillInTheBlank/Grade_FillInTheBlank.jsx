import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import Msg_in_Body from "../../Message/Msg_in_Body";
import ButtonSubmit from "../../Button/ButtonSubmit";
import "../../../styles/main.css";

export default function GradeFillInTheBlank({ chapterId }) {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    async function fetchApprovedQuestions() {
      if (!chapterId) return setQuestions([]);

      const { data, error } = await supabase
        .from("qa_fillintheblank")
        .select("*")
        .eq("chapter_id", chapterId)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (error) {
        setMessage({ type: "error", text: "Failed to load questions." });
        return setQuestions([]);
      }

      const transformed = data.map((q) => {
        const options = [
          q.option_1,
          q.option_2,
          q.option_3,
          q.option_4,
          q.option_5,
        ]
          .filter(Boolean)
          .map((opt) => opt.trim().toLowerCase());
        return { ...q, options };
      });

      setQuestions(transformed);
    }
    fetchApprovedQuestions();
  }, [chapterId]);

  const handleSubmit = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const rawInput = answers[questionId] || "";
    const answer = rawInput.trim().toLowerCase();

    // Check if input is empty
    if (!answer) {
      setResults((prev) => ({
        ...prev,
        [questionId]: "ℹ️ Please answer the question",
      }));
      return;
    }

    const isCorrect = question.options.includes(answer);

    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    setResults((prev) => ({
      ...prev,
      [questionId]: isCorrect ? "Correct! 🎉" : "Incorrect. ❌",
    }));
  };

  return (
    <div className="grade-question-wrapper">
      <Msg_in_Body type={message.type} text={message.text} />

      {questions.map((q) => (
        <div key={q.id} className="card-qst bNavy-bgBlue">
          <h3>{q.question_text}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(q.id);
            }}
            className="grade-form"
          >
            <input
              type="text"
              className="fill-blank-input"
              value={answers[q.id] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
              }
              disabled={submitted[q.id]}
            />

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
                type={results[q.id].startsWith("Correct") ? "success" : "error"}
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
