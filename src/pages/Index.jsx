import React from "react";
import Layout from '../components/Layout';
import "../styles/main.css";

const Home = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to your personalized learning portal."
      keywords={['lms', 'courses', 'dashboard']}
    >

      <section className="heroOne">
            <div className="hero-content">
                <h2>Welcome to the World of Product Owner in Test™</h2>
                <p>Empowering people and teams to use Software exploration to comprehend software products end to end through training, certification, mentoring, consulting, and ongoing community experiences.</p>
                    <div className="hero-buttons">
                        <a href="#" className="button">Explore Now</a>
                        <a href="#" className="button">Watch Video</a>
                    </div>
            </div>
    
    <figure className="hero-image">
          <img
            className="why-image"
            src={`${import.meta.env.BASE_URL}images/home/happypots.gif`}
            alt="Curious Testers"
          />
          <em className="image-caption">Product Owners in Test</em>
        </figure>

        </section>

    </Layout>
  );
};

export default Home;
