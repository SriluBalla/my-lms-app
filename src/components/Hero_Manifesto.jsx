import React from "react";
import ButtonNav from "../components/ButtonNav";
import "../styles/main.css";

export default function Hero_Manifesto() {
  return (
    <section className="hero lite-blue">
      <figure>
        <img
          className="hero-image"
          src={`${import.meta.env.BASE_URL}images/global/Seo_pot.png`}
          alt="Hero Visual"
        />
        <em className="image-caption">QA vs POT</em>
      </figure>

      <div className="hero-text">
        <h2>Manifesto</h2>
        <p className="manifesto">
          <b>Product</b> over <i>Process</i>
        </p>
        <p className="manifesto">
          <b>Opportunities to Improve</b> not <i>Bugs to Squash</i>
        </p>
        <p className="manifesto">
          <b>How does It Work?</b> not <i>Pass or Fail</i>
        </p>
        <p className="manifesto">
          <b>Complete Product Exploration</b> not <i>Isolated Verification</i>
        </p>
        <p className="manifesto">
          <b>Check Cases After Exploration</b> not
          <i>Test Cases From Assumptions</i>
        </p>
        <ButtonNav
          id="pot-manifesto"
          label="POT Manifesto"
          to="/pot-manifesto"
        />
      </div>
    </section>
  );
}
