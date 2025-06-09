import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import Msg_in_Body from "../../Message/Msg_in_Body";
import ButtonSubmit from "../../Button/ButtonSubmit";
import "../../../styles/main.css";

export default function GradeRadiobutton({ chapterId }) {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    async function fetchApprovedQuestions() {
      if (!chapterId) return setQuestions([]);

      const { data, error } = await supabase
        .from("qa_radiobutton")
        .select("*")
        .eq("chapter_id", chapterId)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (error) {
        setMessage({ type: "error", text: "Failed to load questions." });
        return setQuestions([]);
      }

      const transformed = data.map((q) => {
        const options = ["A", "B", "C", "D", "E"]
          .map((letter) => ({
            id: `opt_${q.id}_${letter}`,
            value: letter,
            text: q[`option_${letter.toLowerCase()}`],
          }))
          .filter((opt) => opt.text?.trim());
        return { ...q, options };
      });

      setQuestions(transformed);
    }
    fetchApprovedQuestions();
  }, [chapterId]);

  const handleSubmit = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const selected = selectedAnswers[questionId];

    if (!selected) {
      setResults((prev) => ({
        ...prev,
        [questionId]: "ℹ️ Please answer the question",
      }));
      return;
    }

    const isCorrect = selected === question.is_correct;

    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    setResults((prev) => ({
      ...prev,
      [questionId]: isCorrect ? "Correct!  🎉" : "Incorrect. ❌",
    }));
  };

  return (
    <div className="grade-question-wrapper">
      <Msg_in_Body type={message.type} text={message.text} />

      {questions.map((q) => (
        <div key={q.id} className="card-qst bPink-bgYellow">
          <h3>{q.question_text}</h3>
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
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt.value}
                      disabled={submitted[q.id]}
                      checked={selectedAnswers[q.id] === opt.value}
                      onChange={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [q.id]: opt.value,
                        }))
                      }
                    />
                    <p className="qst-opt">{opt.text}</p>
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
