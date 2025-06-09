import { useState } from "react";
import ButtonAction from "../../Button/ButtonAction";

export default function EditMatchColumn({ question, onSave, onCancel }) {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [pairs, setPairs] = useState([
    { a: question.option_1_a || "", b: question.option_1_b || "" },
    { a: question.option_2_a || "", b: question.option_2_b || "" },
    { a: question.option_3_a || "", b: question.option_3_b || "" },
    { a: question.option_4_a || "", b: question.option_4_b || "" },
  ]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handlePairChange = (index, side, value) => {
    const updated = [...pairs];
    updated[index][side] = value;
    setPairs(updated);
  };

  const handleSave = () => {
    const validPairs = pairs.filter(
      (pair) => pair.a.trim() !== "" && pair.b.trim() !== ""
    );
    if (!questionText.trim() || validPairs.length < 2) {
      setMessage({
        type: "error",
        text: "Please enter a question and at least 2 valid match pairs.",
      });
      return;
    }

    const payload = {
      id: question.id,
      question_text: questionText,
    };

    validPairs.forEach((pair, index) => {
      payload[`option_${index + 1}_a`] = pair.a;
      payload[`option_${index + 1}_b`] = pair.b;
    });

    onSave(payload);
  };

  return (
    <form className="checkbox-form bOrange-bgYellow">
      <h4 className="text-checkbox">
        <b>Match the Columns (2 to 4 rows)</b>
      </h4>

      <textarea
        className="text-area"
        maxLength={1000}
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Enter your question or instruction text for the match the columns"
      />

      <label>
        <strong>Match Pairs (A : B)</strong>
      </label>

      {pairs.map((pair, index) => (
        <div key={index} className="option-row">
          <input
            type="text"
            value={pair.a}
            onChange={(e) => handlePairChange(index, "a", e.target.value)}
            placeholder={`Column A ${index + 1}`}
          />
          <span className="match-separator">:</span>
          <input
            type="text"
            value={pair.b}
            onChange={(e) => handlePairChange(index, "b", e.target.value)}
            placeholder={`Column B ${index + 1}`}
          />
        </div>
      ))}

      {message.text && (
        <p className={`msg-${message.type}`}>{message.text}</p>
      )}

      <div className="submit-row">
        <ButtonAction id={`save-${question.id}`} label="Save Question" onClick={handleSave} />
        <ButtonAction id={`cancel-${question.id}`} label="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
}
