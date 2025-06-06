import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DDL_SelectChapter from "../../components/SQL/DDL_SelectChapter";
import DDL_SelectType from "../../components/SQL/DDL_SelectType";
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
      description="Sample Test, select by Chapter or Question type"
    >
      <div className="body__outline">
            <div className="ddl-group">

        <DDL_SelectChapter value={chapter} onChange={setChapter} />

        <DDL_SelectType value={chapter} onChange={setChapter} />
        </div>
      </div>
    </Layout>
  );
};

export default SampleTest;
