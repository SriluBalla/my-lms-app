import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import Home from './pages/Index';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router basename="/my-lms-app">
      <>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<NotFound />} /> {/* ← Catch-all route */}

        </Routes>
      </>
    </Router>
  );
}

export default App;
