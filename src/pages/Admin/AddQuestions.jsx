import { useState, useEffect } from "react";
import { supabase } from "../../supabaseDB";
import Layout from "../../components/Layout";
import TabbedPanel from "../../components/UI/TabbedPanel";
import DDL_SelectChapter from "../../components/SQL/DDL_SelectChapter";
import AddCheckbox from "../../components/Question/Checkbox/Add_Checkbox.jsx"; 
import AddRadiobutton from "../../components/Question/Radiobutton/Add_Radiobutton";
import AddTrueFalse from "../../components/Question/TrueFalse/Add_TrueFalse";
import AddFillInTheBlank from "../../components/Question/FillInTheBlank/Add_FillInTheBlank";
import AddMatchColumn from "../../components/Question/MatchColumn/Add_MatchColumn.jsx";
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

export default function AddQuestions() {
  const [chapter, setChapter] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    }
    getUser();
  }, []);

  return (
    <Layout
      title="Add Questions for Admin"
      description="Add Questions for Admin only"
    >
      <div className="body__outline">
        <div className="add-question-wrapper">
          <div className="ddl-group">
            <h1>Add a New Question for Chapter</h1>
            <DDL_SelectChapter value={chapter} onChange={setChapter} />
          </div>

          <TabbedPanel tabs={TABS} defaultTab="checkbox">
            {{
              checkbox: <AddCheckbox chapterId={chapter} user={user} />,
              radiobutton: <AddRadiobutton chapterId={chapter} user={user} />,
              truefalse: <AddTrueFalse chapterId={chapter} user={user} />,
              matchcolumn: <AddMatchColumn chapterId={chapter} user={user} />,
              fillintheblank: <AddFillInTheBlank chapterId={chapter} user={user} />,
              // shortanswer: <FormShortAnswer chapterId={chapter} user={user} />,
            }}
          </TabbedPanel>
        </div>
      </div>
    </Layout>
  );
}
