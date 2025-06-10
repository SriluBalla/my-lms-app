import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../supabaseDB";
import DDL_SelectChapter from "../../components/SQL/DDL_SelectChapter";
import GradeCheckbox from "../../components/Question/Checkbox/Grade_Checkbox";
import GradeRadiobutton from "../../components/Question/Radiobutton/Grade_Radiobutton";
import GradeTrueFalse from "../../components/Question/TrueFalse/Grade_TrueFalse";
import GradeFillInTheBlank from "../../components/Question/FillInTheBlank/Grade_FillInTheBlank";
import GradeMatchColumn from "../../components/Question/MatchColumn/Grade_MatchColumn";
import GradeShortAnswer from "../../components/Question/ShortAnswer/Grade_ShortAnswer";
import "../../styles/main.css";

const SampleTest = () => {
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
    <Layout title="Sample Test" description="Sample Test, select by Chapter">
      <div className="body__outline">
        <div className="ddl-group">
          <DDL_SelectChapter value={chapter} onChange={setChapter} />
        </div>

        {/* Only show once a chapter is selected */}
        {chapter && (
          <>
            <GradeCheckbox chapterId={chapter} />
            <GradeRadiobutton chapterId={chapter} />
            <GradeTrueFalse chapterId={chapter} />
            <GradeFillInTheBlank chapterId={chapter} />
            <GradeMatchColumn chapterId={chapter} />
            <GradeShortAnswer chapterId={chapter} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default SampleTest;
