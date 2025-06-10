import { useState } from "react";
import ButtonAction from "../../Button/ButtonAction";

export default function EditShortAnswer({ question, onSave, onCancel }) {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [answers, setAnswers] = useState([
    question.option_1 || "",
    question.option_2 || "",
    question.option_3 || "",
    question.option_4 || "",
  ]);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSave = () => {
    onSave({
      id: question.id,
      question_text: questionText,
      option_1: answers[0],
      option_2: answers[1],
      option_3: answers[2],
      option_4: answers[3],
    });
  };

  return (
    <form className="card-qst">
      <h4 className="text-checkbox">
        <b>Short Answer (Essay - Bullet Points)</b>
      </h4>

      <textarea
        className="text-area"
        maxLength={1000}
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter a short answer or essay-type question."
      ></textarea>

      <label>
        <strong>Model Answer Bullet Points:</strong>
      </label>

      {answers.map((ans, index) => (
        <div key={index} className="option-row">
          <input
            type="text"
            value={ans}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            placeholder={`Point ${index + 1}`}
          />
        </div>
      ))}

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
