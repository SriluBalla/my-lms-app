import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import routes from './components/Routes';
import { supabase } from './supabaseDB';
console.log('Supabase is ready:', supabase);


function App() {

  useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      setUser(session.user);
    }
  });

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => listener.subscription.unsubscribe();
}, []);

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
