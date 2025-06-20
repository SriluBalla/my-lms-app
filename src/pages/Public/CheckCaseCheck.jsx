import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../supabaseDB";
import Add_Issue from "../../components/Question/Issue/Add_Issue";
import "../../styles/main.css";

const CheckCaseTest = () => {
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
          <h1>Practice Logging an ISSUE</h1>
        </div>
        <p>Select a chapter from the drop down list to view the question to practice. To practice Issues and checkcases please log in.</p>

        <div className="add-question-wrapper">
          {/* Only show once a chapter is selected */}
            <>
              <Add_Issue  />
            </>

        </div>
      </div>
    </Layout>
  );
};

export default CheckCaseTest;
