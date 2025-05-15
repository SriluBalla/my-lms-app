import React from 'react';
import Layout from '../components/Layout';
import '../styles/NotFound.css';

const NotFound = () => {
  const images = [
    './images/404/404-1.png',
    './images/404/404-2.png',
    './images/404/404-3.png',
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (

     <Layout
      title="404 | Product Owner in TEST"
      description="Welcome to your personalized learning portal."
      keywords={['lms', 'courses', 'dashboard']}
    >

    
    <div className="not-found">
      <img
        src={randomImage}
        alt="Page Not Found"
        className="not-found__image"
      />
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn’t exist.</p>
    <a href="index./" className="button">Return to Home</a>

    </div>
    </Layout>
  );
};

export default NotFound;
