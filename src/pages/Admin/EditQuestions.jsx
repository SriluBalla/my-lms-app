import { useState, useEffect } from "react";
import { supabase } from "../../supabaseDB";
import Layout from "../../components/Layout";
import TabbedPanel from "../../components/UI/TabbedPanel";
import SelectChapter from "../../components/SQL/DDL_SelectChapter";
import DeleteCheckbox from "../../components/Question/Checkbox/Delete_Checkbox";
import DeleteRadiobutton from "../../components/Question/Radiobutton/Delete_Radiobutton";
import DeleteTrueFalse from "../../components/Question/TrueFalse/Delete_TrueFalse";
import DeleteFillInTheBlank from "../../components/Question/FillInTheBlank/Delete_FillInTheBlank";
import DeleteMatchColumn from "../../components/Question/MatchColumn/Delete_MatchColumn";
import DeleteShortAnswer from "../../components/Question/ShortAnswer/Delete_ShortAnswer";

import "../../styles/main.css";

const TABS = [
  {
    key: "checkbox",
    label: "Checkbox (Multiple Answers)",
    colorClass: "bBlue-bgBlue",
  },
  {
    key: "radiobutton",
    label: "Radiobutton (One Answer)",
    colorClass: "bPink-bgYellow",
  },
  { key: "truefalse", label: "True / False", colorClass: "bRed-bgRed" },
  {
    key: "matchcolumn",
    label: "Match the Columns",
    colorClass: "bOrange-bgYellow",
  },
  {
    key: "fillintheblank",
    label: "Fill in the Blank",
    colorClass: "bNavy-bgBlue",
  },
  { key: "shortanswer", label: "Short Answer", colorClass: "bPurple-bgViolet" },
];

export default function EditQuestions() {
  const [chapter, setChapter] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("✅ USER:", user);

        console.error("Failed to fetch user:", error.message);
      } else {
        setUser(data?.user || null);
      }
    }

    fetchUser();
  }, []);

  return (
    <Layout
      title="Approve Questions"
      description="View, edit, Approve, Delete newly uploaded questions"
    >
      <div className="body__outline">
        <div className="add-question-wrapper">
          <div className="ddl-group">
            <h1>View, Edit, Approve, Delete</h1>
            <SelectChapter value={chapter} onChange={setChapter} />
          </div>

          <TabbedPanel tabs={TABS} defaultTab="checkbox">
            {{
              checkbox: <DeleteCheckbox chapterId={chapter} user={user} />,
              radiobutton: (
                <DeleteRadiobutton chapterId={chapter} user={user} />
              ),
              truefalse: <DeleteTrueFalse chapterId={chapter} user={user} />,
              matchcolumn: (
                <DeleteMatchColumn chapterId={chapter} user={user} />
              ),
              fillintheblank: (
                <DeleteFillInTheBlank chapterId={chapter} user={user} />
              ),
              shortanswer: (
                <DeleteShortAnswer chapterId={chapter} user={user} />
              ),
            }}
          </TabbedPanel>
        </div>
      </div>
    </Layout>
  );
}
