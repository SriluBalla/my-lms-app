import { useState } from "react";
import { supabase } from "../../../supabaseDB";
import TextAreaInput from "../../Input/Input_TextArea";
import ButtonSubmit from "../../Button/ButtonSubmit";
import Msg_in_Body from "../../Message/Msg_in_Body";
import "../../../styles/main.css";

export default function AddMatchColumn({ chapterId, user, colorClass }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { a: "", b: "" },
    { a: "", b: "" },
    { a: "", b: "" },
    { a: "", b: "" },
  ]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (index, key, value) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index][key] = value;
      return newOptions;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chapterId || !question.trim()) {
      setMessage({
        type: "error",
        text: "Please enter the question and select a chapter.",
      });
      return;
    }

    const hasAnyOption = options.some(
      (pair) => pair.a.trim() !== "" && pair.b.trim() !== ""
    );

    if (!hasAnyOption) {
      setMessage({
        type: "error",
        text: "Please enter at least one valid match pair.",
      });
      return;
    }

    const payload = {
      chapter_id: chapterId,
      question_text: question,
      option_1_a: options[0].a,
      option_1_b: options[0].b,
      option_2_a: options[1].a,
      option_2_b: options[1].b,
      option_3_a: options[2].a,
      option_3_b: options[2].b,
      option_4_a: options[3].a,
      option_4_b: options[3].b,
      created_by: user?.id,
    };

    const { error } = await supabase.from("qa_matchcolumns").insert(payload);

    if (error) {
      console.error("Error saving match column question:", error.message);
      setMessage({ type: "error", text: "Failed to save match question." });
    } else {
      setMessage({
        type: "success",
        text: "Match column question saved successfully!",
      });
      setQuestion("");
      setOptions([
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
      ]);
    }
  };

  return (
    <form className="checkbox-form bOrange-bgYellow" onSubmit={handleSubmit}>
      <Msg_in_Body type={message.type} text={message.text} />

      <TextAreaInput
        id="match-column-question"
        name="match-column-question"
        label="Match the Columns"
        placeholder="Write the instructions or question prompt"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1000}
        required
        className="text-area"
      />

      <label>
        <strong>Column A | Column B</strong>
      </label>

      {options.map((pair, index) => (
        <div key={index} className="match-row">
          <input
            type="text"
            placeholder={`A${index + 1}`}
            value={pair.a}
            onChange={(e) => handleChange(index, "a", e.target.value)}
          />
          <span className="match-separator">=</span>
          <input
            type="text"
            placeholder={`B${index + 1}`}
            value={pair.b}
            onChange={(e) => handleChange(index, "b", e.target.value)}
          />
        </div>
      ))}

      <div className="center">
        <ButtonSubmit
          data-testid="saveMatchColumnQuestion"
          label="Save Match the Columns Question"
        />
      </div>
    </form>
  );
}
