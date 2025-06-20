import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import TabbedPanel from "../../components/UI/TabbedPanel";
import SelectChapter from "../../components/SQL/DDL_SelectChapter";
import GradeCheckbox from "../../components/Question/Checkbox/Grade_Checkbox"; 
import GradeRadiobutton from "../../components/Question/Radiobutton/Grade_Radiobutton"; 
import GradeTrueFalse from "../../components/Question/TrueFalse/Grade_TrueFalse"; 
import GradeFillInTheBlank from "../../components/Question/FillInTheBlank/Grade_FillInTheBlank"; 
import GradeMatchColumn from "../../components/Question/MatchColumn/Grade_MatchColumn";
import GradeShortAnswer from "../../components/Question/ShortAnswer/Grade_ShortAnswer";
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

export default function GradeQuestions() {
  const [chapter, setChapter] = useState("");

  return (
    <Layout
      title="Grade Questions"
      description="Grade approved questions"
    >
      <div className="body__outline">
        <div className="add-question-wrapper">
          <div className="ddl-group">
            <h1>Grade Questions for Chapter</h1>
            <SelectChapter value={chapter} onChange={setChapter} />
          </div>

          <TabbedPanel tabs={TABS} defaultTab="checkbox">
            {{
              checkbox: <GradeCheckbox chapterId={chapter} />,
              radiobutton: <GradeRadiobutton chapterId={chapter} />,
              truefalse: <GradeTrueFalse chapterId={chapter} />,
              matchcolumn: <GradeMatchColumn chapterId={chapter} />,
              fillintheblank: <GradeFillInTheBlank chapterId={chapter} />,
              shortanswer: <GradeShortAnswer chapterId={chapter} />,
            }}
          </TabbedPanel>
        </div>
      </div>
    </Layout>
  );
}
