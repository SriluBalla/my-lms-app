import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";
import SavedProfileCard from "../components/SQL/Card_Profile";
import "../styles/main.css";

const MemberProfiles = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchApprovedProfiles = async () => {
      const { data, error } = await supabase
        .from("user_admin_view")
        .select("*")
        .eq("profile_status", "approved");

      if (error) console.error("Failed to fetch profiles:", error);
      else setMembers(data);
    };

    fetchApprovedProfiles();
  }, []);

  return (
    <Layout
      title="Temp"
      description="Learn the differences between traditional Quality Assurance to becoming a Product Owner in Test"
      keywords={[
        "Quality Assurance",
        "Product Owner in Test",
        "Quality Control",
      ]}
      image={`${import.meta.env.BASE_URL}/images/global/Seo_pot.png`}
    >
      <div className="body__outline">
        
        <section className="hero heading">
          <h2>Member Profiles</h2>
          <p>
            <strong>Sort and filter by Name, Role - User, Member, Leader, Admin, Date joined, Country, No. of years in IT</strong>
          </p>
        </section>
        <section className="member-grid">
          {members.map((profile) => (
            <div className="member-card" key={profile.user_id}>
              <SavedProfileCard profile={profile} />
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default MemberProfiles;
