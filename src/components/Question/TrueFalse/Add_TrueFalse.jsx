import { useState } from "react";
import { supabase } from "../../../supabaseDB";
import RichTextEditor from "../../Input/Input_RichTextEditor";
import ButtonSubmit from "../../Button/ButtonSubmit";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function AddTrueFalse({ chapterId, user, colorClass }) {
  const [question, setQuestion] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chapterId || !question.trim() || isCorrect === null) {
      setMessage({
        type: "error",
        text: "Please enter the question and select True or False.",
      });
      return;
    }

    const payload = {
      chapter_id: chapterId,
      question_text: question,
      is_correct: isCorrect,
      created_by: user?.id,
    };

    const { error } = await supabase.from("qa_truefalse").insert(payload);

    if (error) {
      console.error("Insert error:", error.message);
      setMessage({ type: "error", text: "Failed to save question." });
    } else {
      setMessage({
        type: "success",
        text: "True/False question saved successfully!",
      });
      setQuestion("");
      setIsCorrect(null);
    }
  };

  return (
    <form
      className={`checkbox-form ${colorClass || "bRed-bgRed"}`}
      onSubmit={handleSubmit}
    >
      <Msg_in_Body type={message.type} text={message.text} />

      <RichTextEditor
        id="tf-question"
        name="tf-question"
        label="True / False Question"
        placeholder="Type away the Question. Select TRUe or FALSE as the correct answer"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required
        className="text-area"
      />

      <div className="radio-row">
        <input
          type="radio"
          className="radio-button"
          name="tf"
          checked={isCorrect === true}
          onChange={() => setIsCorrect(true)}
        />
        <p className="qst-true">TRUE</p>
      {/* </div>

      <div className="radio-row"> */}
        <input
          type="radio"
          className="radio-button"
          name="tf"
          checked={isCorrect === false}
          onChange={() => setIsCorrect(false)}
        />
        <p className="qst-false">FALSE</p>
      </div>

      <div className="center">
        <ButtonSubmit
          data-testid="saveTrueFalseQuestion"
          label="Save True / False Question"
        />
      </div>
    </form>
  );
}
