import React from "react";
import ButtonNav from "../Button/ButtonNav";
import "../../styles/main.css";

export default function HeroManifesto() {
  return (
    <section className="hero lite-blue flex">
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
        <ul class="bullet-no">
          <li>
            <b>Product</b> over <i>Process</i>
          </li>
          <li>
            <b>Opportunities to Improve</b> not <i>Bugs to Squash</i>
          </li>
          <li>
            <b>How does It Work?</b> not <i>Pass or Fail</i>
          </li>
          <li>
            <b>Complete Product Exploration</b> not <i>Isolated Verification</i>
          </li>
          <li>
            <b>Check Cases After Exploration</b> not
          <i>Test Cases From Assumptions</i>
          </li>
        </ul>

        <ButtonNav
          id="pot-manifesto"
          label="POT Manifesto"
          to="/pot-manifesto"
        />
      </div>
    </section>
  );
}
