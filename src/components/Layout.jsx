import React from 'react';
import SEO from './SEO';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ title, description, keywords, children }) => {
  return (
    <>
      <SEO title={title} description={description} keywords={keywords} />
      
      <Header />

      <main className="p-4">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
