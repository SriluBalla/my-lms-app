import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Courses = () => {
  return (

    <Layout
      title="Courses"
      description="Browse available courses"
      keywords={['courses', 'learning', 'online']}
      image={`${import.meta.env.BASE_URL}images/auth/register-banner.png`}

    >
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Courses</h2>
      <p className="text-gray-700">This is where your course catalog will appear.</p>
    </Layout>
    
  );
};

export default Courses;
