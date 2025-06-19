import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import Layout from "../components/Layout";

const UpdateName = () => {
  return (
    <Layout
      title="Add Questions for Admin"
      description="Add Questions for Admin only"
    >
      <div className="body__outline"></div>
    </Layout>
  );
};

export default UpdateName;