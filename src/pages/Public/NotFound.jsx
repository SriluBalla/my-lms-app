import React from 'react';
import Layout from '../../components/Layout';
import '../../styles/NotFound.css';

const NotFound = () => {
  const images = [
    `${import.meta.env.BASE_URL}images/404/CS_pot.png`,
    `${import.meta.env.BASE_URL}images/404/CS_wfi.png`,
    `${import.meta.env.BASE_URL}images/404/CS_wfi2.png`,
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (

     <Layout
      title="Coming Soon"
      description="Welcome to your personalized learning portal."
      keywords={['Product Owner in Test', 'Quality Assutance', 'Software Testing']}
    >    
    <div className="not-found">
      <img
        src={randomImage}
        alt="Page Coming soon"
        className="not-found__image"
      />
      <h1>Page coming soon</h1>
    <a href="index./" className="button">Return to Home</a>

    </div>
    </Layout>
  );
};

export default NotFound;
