import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseDB";
import Msg_in_Body from "../../Message/Msg_in_Body";
import ButtonSubmit from "../../Button/ButtonSubmit";
import "../../../styles/main.css";

export default function GradeMatchColumn({ chapterId }) {
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    async function fetchApprovedQuestions() {
      if (!chapterId) {
        setQuestions([]);
        return;
      }

      const { data, error } = await supabase
        .from("qa_matchcolumns")
        .select("*")
        .eq("chapter_id", chapterId)
        .eq("is_approved", true)
        .order("created_at", { ascending: true });

      if (error) {
        setMessage({ type: "error", text: "Failed to load questions." });
        setQuestions([]);
      } else {
        const transformed = data.map((q) => {
          const pairs = [1, 2, 3, 4]
            .map((i) => ({
              a: q[`option_${i}_a`],
              b: q[`option_${i}_b`],
              id: `${q.id}-${i}`,
            }))
            .filter((pair) => pair.a && pair.b);

          const allBs = pairs.map((p) => p.b).sort(() => 0.5 - Math.random());

          return { ...q, pairs, allBs };
        });
        setQuestions(transformed);
        setMessage({ type: "", text: "" });
      }
    }

    fetchApprovedQuestions();
  }, [chapterId]);

  const handleChange = (questionId, rowIndex, selectedB) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [rowIndex]: selectedB,
      },
    }));
  };

  const handleSubmit = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const userAns = userAnswers[questionId] || {};

    const hasAttempted = Object.values(userAns).some((val) => val?.trim());

    if (!hasAttempted) {
      setResults((prev) => ({
        ...prev,
        [questionId]: "ℹ️ Please answer the question",
      }));
      return;
    }

    const isCorrect = question.pairs.every(
      (pair, i) =>
        userAns[i]?.trim().toLowerCase() === pair.b.trim().toLowerCase()
    );

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
        <div key={q.id} className="card-qst bOrange-bgYellow ">
          <p className="qst-head center">{q.question_text}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(q.id);
            }}
            className="grade-form"
          >
            <table className="table-match">
              <thead>
                <tr>
                  <th>Match This</th>
                  <th>With This</th>
                </tr>
              </thead>
              <tbody>
                {q.pairs.map((pair, index) => (
                  <tr key={pair.id}>
                    <td>{pair.a}</td>
                    <td>
                      <select
                        disabled={submitted[q.id]}
                        value={userAnswers[q.id]?.[index] || ""}
                        onChange={(e) =>
                          handleChange(q.id, index, e.target.value)
                        }
                      >
                        <option value="">--Select--</option>
                        {q.allBs.map((bOpt, i) => (
                          <option key={i} value={bOpt}>
                            {bOpt}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!submitted[q.id] && (
              <div className="center">
                <ButtonSubmit
                  type="submit"
                  label="Submit Answer"
                  data-testid="submitMatch"
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
