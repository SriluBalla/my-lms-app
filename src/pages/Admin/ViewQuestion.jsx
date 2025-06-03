import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";
import MemberProfileCard from "../components/MemberProfileCard";

const ViewQuestions = () => {
  return (
    <Layout
      title="View and edit Questions for Admins"
      description="View and Edit for Admins only"
    >
      <div className="body__outline"></div>
    </Layout>
  );
};

export default ViewQuestions;
