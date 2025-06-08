import { useState } from "react";
import { supabase } from "../../../supabaseDB";
import TextAreaInput from "../../Input/Input_TextArea";
import ButtonSubmit from "../../Button/ButtonSubmit";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function AddFillInTheBlank({ chapterId, user, colorClass }) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filled = answers.filter((a) => a.trim() !== "");

    if (!chapterId || !question.trim() || filled.length === 0) {
      setMessage({
        type: "error",
        text: "Please enter a question and at least one correct answer.",
      });
      return;
    }

    const payload = {
      chapter_id: chapterId,
      question_text: question,
      option_1: answers[0],
      option_2: answers[1],
      option_3: answers[2],
      option_4: answers[3],
      option_5: answers[4],
      created_by: user?.id,
    };

    const { error } = await supabase.from("qa_fillintheblank").insert(payload);

    if (error) {
      console.error("Error saving fill-in-the-blank:", error.message);
      setMessage({ type: "error", text: "Failed to save the question." });
    } else {
      setMessage({
        type: "success",
        text: "Fill in the Blank question saved successfully!",
      });
      setQuestion("");
      setAnswers(["", "", "", "", ""]);
    }
  };

  return (
    <form className="checkbox-form bNavy-bgBlue" onSubmit={handleSubmit}>
      <Msg_in_Body type={message.type} text={message.text} />

      <TextAreaInput
        id="fib-question"
        name="fib-question"
        label="Fill in the Blank"
        placeholder="Type the question with a blank (e.g., The capital of France is _____.)"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required
        className="text-area"
      />

      <label>
        <strong>Acceptable Answers:</strong>
      </label>
      {answers.map((answer, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Answer ${index + 1}`}
          value={answer}
          onChange={(e) => handleAnswerChange(index, e.target.value)}
          className="text-input"
        />
      ))}

      <div className="center">
        <ButtonSubmit
          data-testid="saveFillInTheBlank"
          label="Save Fill in the Blank Question"
        />
      </div>
    </form>
  );
}
