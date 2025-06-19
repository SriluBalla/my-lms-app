import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../supabaseDB";
// import View_Issues from "../../components/Question/Issue/View_Issues";
import "../../styles/main.css";

const GradeIssue = () => {
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
        <section className="hero heading">
          <h2>Welcome to Issue Logging practice</h2>
          <p>
            <strong>
             Tell your story of how you found the issue. Explain how you would like to see it fixed
            </strong>
          </p>
        </section>

        {/* Only show once a chapter is selected */}
        <>
          <View_Issues />
        </>
      </div>
    </Layout>
  );
};

export default GradeIssue;
