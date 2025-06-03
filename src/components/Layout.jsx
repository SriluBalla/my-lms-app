import React from 'react';
import SEO from './Global/SEO';
import Header from './Global/Header';
import Footer from './Global/Footer';


const Layout = ({ title, description, keywords, children }) => {
  return (
    <>
      <SEO title={title} description={description} keywords={keywords} />
      
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
