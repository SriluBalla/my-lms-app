import SEO from '../components/SEO';

const Home = () => {
  return (
    <div>
      <SEO
        title="Home"
        description="Welcome to Product Owner in Test. The home of software product explorers"
        keywords={['Product Owner in Test', 'Quality Assistant', 'Software testing education', 'software testing certifications']}
      />
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>This is srilu's page</p>
    </div>
  );
};

export default Home;