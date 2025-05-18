import React, { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/forms/TextInput";
import "../styles/Register.css";

const Red_Acknowledment = () => {

  return (
    <Layout title="Register" 
    description="Create your account">
    
      <section className="register-page">
        {/* Left: Info Panel */}
        <div className="register-info">
          <h2>Before You Register</h2>
          <p>
            {" "}
            🤝 We will asking for the following information to get to know you
            and work with you efficiently.
          </p>
          <ul>
            <li>
              <strong>First & Last Name</strong> and{" "}
              <strong>Prefered Name</strong>
            </li>
            <li>
              <strong>🌐 Email</strong> (max 100 characters)
            </li>
            <li>
              <strong>🔐 Password</strong> (min 8, max 50 chars with uppercase,
              lowercase, number, special char)
            </li>
            <li>
              <strong>🚻 Gender</strong>{" "}
            </li>
            <li>
              <strong>📅 Birth Day</strong> and <strong>Month</strong> we would
              like to celebrate you.
            </li>
            <li>
              <strong>🌎 Country of Residence</strong> for time zone
            </li>
          </ul>

          <h4>After registration, you'll be asked for:</h4>
          <ul>
            <li>📸 A profile image</li>
            <li>⏳ Years of IT experience</li>
            <li>📝 A short self-introduction</li>
            <li>🔗 (Optional) LinkedIn or GitHub or a blog you have</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Red_Acknowledment;
