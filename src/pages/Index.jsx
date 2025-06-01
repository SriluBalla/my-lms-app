import React from "react";
import Layout from "../components/Layout";
import "../styles/main.css";
import Hero from "../components/Hero_Manifesto";
import Hero_Manifesto from "../components/Hero_Manifesto";
import Hero_HappyPots from "../components/Hero_HappyPots";

const Home = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to your personalized learning portal."
      keywords={["lms", "courses", "dashboard"]}
    >
      <div className="body__outline">
        <Hero_Manifesto />
        <Hero_HappyPots />
      </div>
    </Layout>
  );
};

export default Home;
