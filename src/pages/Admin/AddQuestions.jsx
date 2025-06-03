import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseDB";
import Layout from "../../components/Layout";
import FormCheckbox from "../../components/Question/Form_CheckBox";
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

const AddQuestions = () => {
  const [activeTab, setActiveTab] = useState("checkbox");
  const activeTabObj = TABS.find((tab) => tab.key === activeTab);

  return (
    <Layout
      title="Add Questions for Admin"
      description="Add Questions for Admin only"
    >
      <div className="body__outline">
        <div className="add-question-wrapper">
          <h1 className="form-title">Add a New Question</h1>

          <nav className="tab-nav">
            {TABS.map((tab) => (
              <span
                key={tab.key}
                className={`tab-link ${tab.colorClass} ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <div className={`form-body ${activeTabObj?.colorClass}`}>
            {activeTab === "checkbox" && <FormCheckbox />}
            {activeTab === "radiobutton" && <FormRadiobutton />}
            {activeTab === "truefalse" && <FormTrueFalse />}
            {activeTab === "match" && <FormMatchColumns />}
            {activeTab === "fillblank" && <FormFillInTheBlank />}
            {activeTab === "shortanswer" && <FormShortAnswer />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddQuestions;
