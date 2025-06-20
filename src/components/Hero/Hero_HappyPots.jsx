import React from "react";
import ButtonNav from "../Button/ButtonNav";
import "../../styles/main.css";

export default function HeroHappyPots() {
  return (
    <section className="hero blue flex">
      <div className="hero-text">
        <h2>Welcome to the World of Product Owner in Test™</h2>
        <p>
          Empowering people and teams to use Software exploration to comprehend
          software products end to end through training, certification,
          mentoring, consulting, and ongoing community experiences.
          </p>
          <ButtonNav
            id="qa-pot"
            label="QA to POT"
            to="/qa-to-pot/"
          />
        
      </div>

      <figure>
        <img
          className="hero-image"
          src={`${import.meta.env.BASE_URL}images/home/happypots.gif`}
          alt="Curious Testers"
        />
        <em className="image-caption">Product Owners in Test</em>
      </figure>
    </section>
  );
}
