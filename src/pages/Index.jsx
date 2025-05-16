import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to your personalized learning portal."
      keywords={['lms', 'courses', 'dashboard']}
    >
      
      <section className="hero">
        <link rel="stylesheet" href="css/main.css" />   
            <div className="hero-content">
                <h2>Welcome to the World of Product Owner in Test™</h2>
                <p>Empowering people and teams to use Software exploration to comprehend software products end to end through training, certification, mentoring, consulting, and ongoing community experiences.</p>
                    <div className="hero-buttons">
                        <a href="#" className="button">Explore Now</a>
                        <a href="#" className="button">Watch Video</a>
                    </div>
            </div>
    
            <div className="hero-image">
                <img src="images/home/happypots.gif" alt="Curious Testers"/>
            </div>
        </section>

    </Layout>
  );
};

export default Home;
