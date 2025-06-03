import React from "react";
import Layout from "../components/Layout";
import HeroManifesto from "../components/Hero/Hero_Manifesto";
import HeroHappyPots from "../components/Hero/Hero_HappyPots";
import "../styles/main.css";

const Home = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to your personalized learning portal."
      keywords={["lms", "courses", "dashboard"]}
    >
      <div className="body__outline">
        <HeroManifesto />
        <HeroHappyPots />
      </div>
    </Layout>
  );
};

export default Home;
