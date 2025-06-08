import { useState } from "react";
import ButtonAction from "../../Button/ButtonAction";
// import Msg_in_Body from "../../Message/Msg_in_Body";

export default function EditRadiobutton({ question, onSave, onCancel }) {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [options, setOptions] = useState([
    question.option_a,
    question.option_b,
    question.option_c,
    question.option_d,
    question.option_e,
  ]);
  const [correct, setCorrect] = useState(question.is_correct);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSave = () => {
    const filled = options.filter((opt) => opt.trim() !== "");
    if (!questionText.trim() || filled.length < 2 || !correct) {
      setMessage({
        type: "error",
        text: "Please enter at least 2 options, question text, and select the correct answer.",
      });
      return;
    }

    onSave({
      id: question.id,
      question_text: questionText,
      options,
      is_correct: correct,
    });
  };

  const labels = ["A", "B", "C", "D", "E"];

  return (
    <form className="checkbox-form">
      {/* <Msg_in_Body type={message.type} text={message.text} /> */}

      <label className="text-checkbox">
        <b>Radio Button (Single Correct Answer)</b>
      </label>

      <textarea
        className="text-area"
        maxLength={1000}
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="One question at a time please..."
      />

      <label>
        <strong>Options:</strong>
      </label>

      {labels.map((label, index) => (
        <div key={label} className="option-row">
          <input
            type="text"
            value={options[index]}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${label}`}
          />
          <label>
            <input
              type="radio"
              name="correctAnswer"
              value={label}
              checked={correct === label}
              onChange={() => setCorrect(label)}
            />
            Correct
          </label>
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
