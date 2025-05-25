import React from 'react';
import Layout from '../components/Layout';
import routes from '../components/Routes';
import '../styles/main.css';

const MemberProfiles = () => {
  return (
    <Layout
      title="Temp"
      description="Learn the differences between traditional Quality Assurance to becoming a Product Owner in Test"
      keywords={['Quality Assurance', 'Product Owner in Test', 'Quality Control']}>
      image={`${import.meta.env.BASE_URL}images/global/Seo_pot.png`}
              

    </Layout>
  );
};

export default MemberProfiles;
