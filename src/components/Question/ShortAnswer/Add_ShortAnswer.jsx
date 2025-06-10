import { useState } from "react";
import { supabase } from "../../../supabaseDB";
import TextAreaInput from "../../Input/Input_TextArea";
import ButtonSubmit from "../../Button/ButtonSubmit";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function AddShortAnswer({ chapterId, user }) {
  const [question, setQuestion] = useState("");
  const [points, setPoints] = useState(Array(4).fill(""));
  const [message, setMessage] = useState({ type: "", text: "" });

  const handlePointChange = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledPoints = points.filter((p) => p.trim() !== "");

    if (!chapterId || !question.trim() || filledPoints.length === 0) {
      setMessage({
        type: "error",
        text: "Please provide a question, select a chapter, and enter at least one bullet point.",
      });
      return;
    }

    const payload = {
      chapter_id: chapterId,
      question_text: question,
      created_by: user?.id,
    };

    filledPoints.forEach((p, index) => {
      payload[`option_${index + 1}`] = p;
    });

    const { error } = await supabase.from("qa_shortanswer").insert(payload);

    if (error) {
      console.error("Error saving short answer question:", error.message);
      setMessage({ type: "error", text: "Failed to save question." });
      return;
    }

    setMessage({
      type: "success",
      text: "Short answer question saved successfully!",
    });

    setQuestion("");
    setPoints(Array(4).fill(""));
  };

  return (
    <form className="checkbox-form bPurple-bgViolet" onSubmit={handleSubmit}>
      <Msg_in_Body type={message.type} text={message.text} />
      <TextAreaInput
        id="shortessay"
        name="shortessay"
        label="Short Answer (Model Answer as Bullet Points)"
        placeholder="Type the question that expects a short answer with key points."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required
        className="text-area"
      />
      <label>
        <strong>Model Answer Bullet Points:</strong>
      </label>
      {points.map((pt, index) => (
        <div key={index} className="option-row">
          <input
            type="text"
            value={pt}
            placeholder={`Model Answer Point ${index + 1}`}
            onChange={(e) => handlePointChange(index, e.target.value)}
          />
        </div>
      ))}
      <div className="center">
        <ButtonSubmit
          data-testid="saveShortEssay"
          label="Save Short Answer Question"
        />
      </div>
    </form>
  );
}
