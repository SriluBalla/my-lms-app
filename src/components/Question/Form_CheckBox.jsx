import { useState } from "react";
import TextAreaInput from "../Input/Input_TextArea";
import ButtonSubmit from "../Button/ButtonSubmit";
import "../../styles/QuestionForm.css";

export default function FormCheckbox() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(
    Array(5).fill({ text: "", isCorrect: false })
  );

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      question,
      options,
    });
    // TODO: Show preview component or pass data to preview handler
  };

  return (
    <form className="checkbox-form" onSubmit={handleSubmit}>
      <label htmlFor="question"><strong>Question:</strong></label>
      <TextAreaInput
        id="checkboxes"
        name="checkboxes"
        label="Checkbox (Multiple Correct Answers)"
        placeholder="Type away, Type away, Question. One Question at a time ...."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required={true}
        className="text-area"
      />

      <label><strong>Options:</strong></label>
      {options.map((opt, index) => (
        <div key={index} className="option-row">
          <input
            type="text"
            value={opt.text}
            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
            placeholder={`Option ${index + 1}`}
            
          />
          <label>
            <input
              type="checkbox"
              checked={opt.isCorrect}
              onChange={(e) =>
                handleOptionChange(index, "isCorrect", e.target.checked)
              }
            />
            Correct
          </label>
        </div>
      ))}

      <div className="submit-row">
        <ButtonSubmit data-testId="previewQuestion" label="Preview Question" />
      </div>
    </form>
  );
}
