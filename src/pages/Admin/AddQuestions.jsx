import { useState, useEffect } from "react";
import { supabase } from "../../supabaseDB";
import Layout from "../../components/Layout";
import TabbedPanel from "../../components/UI/TabbedPanel";
import SelectChapter from "../../components/SQL/DDL_SelectChapter";
import FormCheckbox from "../../components/Question/Form_CheckBox";
import PreviewCheckboxQuestion from "../../components/Question/Q_CheckBox";
// import FormRadiobutton from "../../components/Question/Form_Radiobutton";
// import FormTrueFalse from "../../components/Question/Form_TrueFalse";
// import FormMatchColumns from "../../components/Question/Form_Match";
// import FormFillInTheBlank from "../../components/Question/Form_FillInTheBlank";
// import FormShortAnswer from "../../components/Question/Form_ShortAnswer";
import "../../styles/main.css";

const TABS = [
  {
    key: "checkbox",
    label: "Checkbox (Multiple Answers)",
    colorClass: "blue",
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
            <SelectChapter value={chapter} onChange={setChapter} />
          </div>

          <TabbedPanel tabs={TABS} defaultTab="checkbox">
            {{
              checkbox: <FormCheckbox chapterId={chapter} user={user} />,
              // radiobutton: <FormRadiobutton chapterId={chapter} user={user} />,
              // truefalse: <FormTrueFalse chapterId={chapter} user={user} />,
              // matchcolumn: <FormMatchColumns chapterId={chapter} user={user} />,
              // fillintheblank: <FormFillInTheBlank chapterId={chapter} user={user} />,
              // shortanswer: <FormShortAnswer chapterId={chapter} user={user} />,
            }}
          </TabbedPanel>
        </div>
        
      </div>
      
    </Layout>
  );
}
