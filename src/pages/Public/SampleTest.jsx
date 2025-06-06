import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../supabaseDB";
import DDL_SelectChapter from "../../components/SQL/DDL_SelectChapter";
import GradeCheckBox from "../../components/Question/Checkbox/Grade_CheckBox";
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
    <Layout
      title="Sample Test"
      description="Sample Test, select by Chapter"
    >
      <div className="body__outline">
        <div className="ddl-group">
          <DDL_SelectChapter value={chapter} onChange={setChapter} />
        </div>

        {/* Only show once a chapter is selected */}
        {chapter && (
          <GradeCheckBox chapterId={chapter} />
        )}
      </div>
    </Layout>
  );
};

export default SampleTest;
