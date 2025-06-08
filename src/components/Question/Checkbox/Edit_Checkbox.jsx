import { useState } from "react";
import ButtonAction from "../../Button/ButtonAction";

export default function EditCheckbox({ question, onSave, onCancel }) {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [options, setOptions] = useState(question.checkbox_options);

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  const handleSave = () => {
    onSave({
      id: question.id,
      question_text: questionText,
      options,
    });
  };

  return (
    <form className="card-qst">
      <h4 className="text-checkbox">
        <b>Checkbox (Multiple Correct Answers)</b>
      </h4>

      <textarea
        className="text-area"
        maxLength={1000}
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Type away, Type away, Question. One Question at a time ...."
      ></textarea>

      <label>
        <strong>Options:</strong>
      </label>

      {options.map((opt, index) => (
        <div key={opt.id || index} className="option-row">
          <input
            type="text"
            value={opt.option_text || opt[`option_${index + 1}`] || ""}
            onChange={(e) =>
              handleOptionChange(index, "option_text", e.target.value)
            }
            placeholder={`Option ${index + 1}`}
          />
          <label>
            <input
              className="check-box"
              type="checkbox"
              checked={
                opt.is_correct || opt[`is_correct_${index + 1}`] || false
              }
              onChange={(e) =>
                handleOptionChange(index, "is_correct", e.target.checked)
              }
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
