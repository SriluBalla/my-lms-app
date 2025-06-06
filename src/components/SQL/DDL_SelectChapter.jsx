import { useEffect, useState } from "react";
import { supabase } from "../../supabaseDB";
import Msg_in_Body from "../Message/Msg_in_Body";

export default function DDL_SelectChapter({ value, onChange }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchChapters() {
      setLoading(true);
      const { data, error } = await supabase
        .from("chapters")
        .select("id, chapter_name")
        .order("chapter_name");

      // console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Error fetching chapters:", error.message);
        setMessage({
          type: "error",
          text: `Failed to load chapters: ${error.message}`,
        });
      } else {
        setChapters(data);
        setMessage({ type: "", text: "" });
      }
      setLoading(false);
    }

    fetchChapters();
  }, []);

  return (
    <div className="ddl-group">
      <Msg_in_Body type={message.type} text={message.text} />
      <select
        id="chapter"
        name="chapter"
        className="dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={loading}
      >
        <option value="">-- Select Chapter --</option>
        {chapters.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            {chapter.chapter_name}
          </option>
        ))}
      </select>
    </div>
  );
}
