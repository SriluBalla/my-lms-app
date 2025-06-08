import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import TabbedPanel from "../../components/UI/TabbedPanel";
import SelectChapter from "../../components/SQL/DDL_SelectChapter";
import DeleteCheckbox from "../../components/Question/Checkbox/Delete_Checkbox"; // ✅ Your new component
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
              checkbox: <DeleteCheckbox chapterId={chapter} />,
              // radiobutton: <ViewRadiobutton chapterId={chapter} />,
              // truefalse: <ViewTrueFalse chapterId={chapter} />,
              // matchcolumn: <ViewMatchColumns chapterId={chapter} />,
              // fillintheblank: <ViewFillInTheBlank chapterId={chapter} />,
              // shortanswer: <ViewShortAnswer chapterId={chapter} />,
            }}
          </TabbedPanel>
        </div>
      </div>
    </Layout>
  );
}
