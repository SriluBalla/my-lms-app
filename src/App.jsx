import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './components/Routes';
import { supabase } from './supabaseDB';
console.log('Supabase is ready:', supabase);


function App() {
  return (
    <Router basename="/my-lms-app">
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
