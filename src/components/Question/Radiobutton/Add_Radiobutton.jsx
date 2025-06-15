import { useState } from "react";
import { supabase } from "../../../supabaseDB";
import RichTextEditor from "../../Input/Input_RichTextEditor";
import ButtonSubmit from "../../Button/ButtonSubmit";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function AddRadiobutton({ chapterId, user, colorClass }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });
  const [correctOption, setCorrectOption] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (letter, value) => {
    setOptions((prev) => ({ ...prev, [letter]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledOptions = Object.entries(options).filter(
      ([, val]) => val.trim() !== ""
    );

    if (
      !chapterId ||
      !question.trim() ||
      filledOptions.length < 2 ||
      !correctOption
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all fields and choose the correct answer.",
      });
      return;
    }

    const payload = {
      chapter_id: chapterId,
      question_text: question,
      option_a: options.A,
      option_b: options.B,
      option_c: options.C,
      option_d: options.D,
      option_e: options.E,
      is_correct: correctOption,
      created_by: user?.id,
    };

    const { error } = await supabase.from("qa_radiobutton").insert(payload);

    if (error) {
      console.error("Error saving question:", error.message);
      setMessage({ type: "error", text: "Failed to save question." });
    } else {
      setMessage({
        type: "success",
        text: "Question and options saved successfully!",
      });
      setQuestion("");
      setOptions({ A: "", B: "", C: "", D: "", E: "" });
      setCorrectOption("");
    }
  };

  return (
    <form className="checkbox-form bPink-bgYellow" onSubmit={handleSubmit}>
      <Msg_in_Body type={message.type} text={message.text} />

      <RichTextEditor
        id="radio-question"
        name="radio-question"
        label="Radiobutton (One Correct Answer)"
        placeholder="Type away the Question. Checkbox ON only one correct options"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required
        className="text-area"
      />

      <label>
        <strong>Options:</strong>
      </label>

      {["A", "B", "C", "D", "E"].map((letter) => (
        <div key={letter} className="radio-row">
          <input
            type="radio"
            className="radio-button"
            name="correctOption"
            checked={correctOption === letter}
            onChange={() => setCorrectOption(letter)}
          />
          <input
            type="text"
            placeholder={`Option ${letter}`}
            value={options[letter]}
            onChange={(e) => handleChange(letter, e.target.value)}
          />
        </div>
      ))}

      <div className="center">
        <ButtonSubmit
          data-testid="saveRadioQuestion"
          label="Save Radiobutton Question and Options"
        />
      </div>
    </form>
  );
}
