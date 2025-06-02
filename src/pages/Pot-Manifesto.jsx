import React from "react";
import Layout from "../components/Layout";
import "../styles/main.css";

const PotManifesto = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout
      title="Home"
      description="Welcome to your personalized learning portal."
      keywords={["lms", "courses", "dashboard"]}
    >
      <div className="body__outline">
        <section className="hero heading">
          <div className="hero-text">
            <h1>Manifesto</h1>

            <ul className="bullet-no manifesto-list">
              <li onClick={() => scrollToSection("product-over-process")}>
                <b>Product</b> over <i>Process</i>
              </li>
              <li onClick={() => scrollToSection("opportunities-to-improve")}>
                <b>Opportunities to Improve</b> not <i>Bugs to Squash</i>
              </li>
              <li onClick={() => scrollToSection("how-does-it-work")}>
                <b>How does It Work?</b> not <i>Pass or Fail</i>
              </li>
              <li
                onClick={() => scrollToSection("complete-product-exploration")}
              >
                <b>Complete Product Exploration</b> not{" "}
                <i>Isolated Verification</i>
              </li>
              <li
                onClick={() => scrollToSection("check-cases-after-exploration")}
              >
                <b>Check Cases After Exploration</b> not{" "}
                <i>Test Cases From Assumptions</i>
              </li>
            </ul>
          </div>
        </section>

        <section className="hero bYellow-bgPink" id="product-over-process">
          <div className="hero-text">
            <h2>Product Over Process</h2>
            <div class="manifesto-section">
              <ul class="manifesto-points">
                <li>We do not serve the process—we serve the product.</li>
                <li>
                  Processes are tools, not goals. They can guide us, but they
                  must never blind us.
                </li>
                <li>We challenge rituals that ignore reality.</li>
                <li>
                  We prioritize working features, truthful behavior, and user
                  experience over procedural perfection.
                </li>
                <li>
                  We adapt the process to fit the product—not the other way
                  around.
                </li>
                <li>
                  Because what matters most is not how well we followed the
                  process — but what we actually built for the people who use
                  it.
                </li>
              </ul>

              <div class="manifesto-poem bgPink-bPink">
                <p>The checklist never felt the pain.</p>
                <p>The template never tapped the screen.</p>
                <p> Only the product holds the truth.</p>
                <p>
                  So we follow the product,
                  <br />
                  Not the path someone else drew on a paper.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="hero blue" id="opportunities-to-improve">
          <div className="hero-text">
            <h2>Opportunities to Improve, Not Bugs to Squash</h2>
            <p>...your text...</p>
          </div>
        </section>

        <section className="hero lite-blue" id="how-does-it-work">
          <div className="hero-text">
            <h2>How Does It Work? Not Pass or Fail</h2>
            <p>...your text...</p>
          </div>
        </section>

        <section className="hero blue" id="complete-product-exploration">
          <div className="hero-text">
            <h2>Complete Product Exploration, Not Isolated Verification</h2>
            <p>...your text...</p>
          </div>
        </section>

        <section className="hero lite-blue" id="check-cases-after-exploration">
          <div className="hero-text">
            <h2>
              Check Cases After Exploration, Not Test Cases From Assumptions
            </h2>
            <p>...your text...</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PotManifesto;
