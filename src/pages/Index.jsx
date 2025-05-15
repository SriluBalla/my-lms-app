import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to your personalized learning portal."
      keywords={['lms', 'courses', 'dashboard']}
    >
      <div className="text-center mt-8">
        <h2 className="text-3xl font-bold text-blue-600">Welcome to My LMS</h2>
        <p className="text-gray-700 mt-4">
          Explore courses, track progress, and grow your skills.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
