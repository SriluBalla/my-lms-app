import { useState } from "react";
import { supabase } from "../../../supabaseDB";
import TextAreaInput from "../../Input/Input_TextArea";
import ButtonSubmit from "../../Button/ButtonSubmit";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function AddCheckbox({ chapterId, user }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(
    Array(5).fill({ text: "", isCorrect: false })
  );
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledOptions = options.filter((opt) => opt.text.trim() !== "");

    if (!chapterId || !question.trim() || filledOptions.length < 2) {
      setMessage({
        type: "error",
        text: "Please enter at least two options and select a chapter.",
      });
      return;
    }

    // Prepare column-value pairs for options
    const payload = {
      chapter_id: chapterId,
      question_text: question,
      created_by: user?.id,
    };

    filledOptions.forEach((opt, index) => {
      payload[`option_${index + 1}`] = opt.text;
      payload[`is_correct_${index + 1}`] = opt.isCorrect;
    });

    // Insert into checkbox_qa
    const { error } = await supabase.from("checkbox_qa").insert(payload);

    if (error) {
      console.error("Error saving question:", error.message);
      setMessage({ type: "error", text: "Failed to save question." });
      return;
    }

    setMessage({
      type: "success",
      text: "Question and options saved successfully!",
    });

    setQuestion("");
    setOptions(Array(5).fill({ text: "", isCorrect: false }));
  };

  return (
    <form className="checkbox-form bBlue-bgBlue" onSubmit={handleSubmit}>
      <Msg_in_Body type={message.type} text={message.text} />
      <TextAreaInput
        id="checkboxes"
        name="checkboxes"
        label="Checkbox (Multiple Correct Answers)"
        placeholder="Type away, Type away, Question. One Question at a time ...."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required
        className="text-area"
      />
      <label>
        <strong>Options:</strong>
      </label>
      {options.map((opt, index) => (
        <div key={index} className="option-row">
          <input
            data-testid={`option${index + 1}`}
            type="text"
            value={opt.text}
            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <label>
            <input
              data-testid={`check${index + 1}`}
              className="check-box"
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
      <div className="center-btn">
        <ButtonSubmit
          data-testid="saveQuestionOptions"
          label="Save Question and Options"
        />
      </div>
    </form>
  );
}
