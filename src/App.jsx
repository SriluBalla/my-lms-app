import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import Home from './pages/Home';

function App() {
  return (
    <Router basename="/my-lms-app">
      <>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
