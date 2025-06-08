import { useState } from "react";
import ButtonAction from "../../Button/ButtonAction";

export default function Edit_FillIntheBlank({ question, onSave, onCancel }) {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [answers, setAnswers] = useState([
    question.option_1 || "",
    question.option_2 || "",
    question.option_3 || "",
    question.option_4 || "",
    question.option_5 || "",
  ]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSave = () => {
    const validAnswers = answers.filter((ans) => ans.trim() !== "");
    if (!questionText.trim() || validAnswers.length === 0) {
      setMessage({
        type: "error",
        text: "Please enter the question and at least one acceptable answer.",
      });
      return;
    }

    onSave({
      id: question.id,
      question_text: questionText,
      options: validAnswers,
    });
  };

  return (
    <form className="checkbox-form">
      <h4 className="text-checkbox">
        <b>Fill in the Blank (1 to 5 correct answers)</b>
      </h4>

      <textarea
        className="text-area"
        maxLength={1000}
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Write the question with a blank. Accept multiple correct answers."
      />

      <label>
        <strong>Acceptable Answers:</strong>
      </label>

      {answers.map((val, idx) => (
        <input
          key={idx}
          type="text"
          value={val}
          onChange={(e) => handleAnswerChange(idx, e.target.value)}
          placeholder={`Answer ${idx + 1}`}
        />
      ))}

      {message.text && <p className={`msg-${message.type}`}>{message.text}</p>}

      <div className="submit-row">
        <ButtonAction id="save-fill" label="Save Question" onClick={handleSave} />
        <ButtonAction id="cancel-fill" label="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
}
