import { useState } from "react";
import ButtonAction from "../../Button/ButtonAction";

export default function EditTrueFalse({ question, onSave, onCancel }) {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [isCorrect, setIsCorrect] = useState(question.is_correct);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSave = () => {
    if (!questionText.trim()) {
      setMessage({
        type: "error",
        text: "Please enter the question text.",
      });
      return;
    }

    if (isCorrect !== true && isCorrect !== false) {
      setMessage({
        type: "error",
        text: "Please select True or False as the correct answer.",
      });
      return;
    }

    onSave({
      id: question.id,
      question_text: questionText,
      is_correct: isCorrect,
    });
  };

  return (
    <form className="checkbox-form">
      <h4 className="text-checkbox">
        <b>True / False</b>
      </h4>

      <textarea
        className="text-area"
        maxLength={1000}
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter your true/false question here"
      />

      <label>
        <strong>Select the correct answer:</strong>
      </label>

      <div className="option-row">
        <label>
          <input
            type="radio"
            name="truefalse"
            checked={isCorrect === true}
            onChange={() => setIsCorrect(true)}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="truefalse"
            checked={isCorrect === false}
            onChange={() => setIsCorrect(false)}
          />
          False
        </label>
      </div>

      {message.text && (
        <p className={`msg-${message.type}`}>{message.text}</p>
      )}

      <div className="submit-row">
        <ButtonAction
          id={`save-${question.id}`}
          label="Save Question"
          onClick={handleSave}
        />
        <ButtonAction
          id={`cancel-${question.id}`}
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  );
}
