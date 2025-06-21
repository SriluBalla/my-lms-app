import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./components/Routes";
import { supabase } from "./supabaseDB";
import { Helmet } from "react-helmet";

function AppLayout() {
  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href={`${import.meta.env.BASE_URL}images/global/favicon.ico`}
        />
      </Helmet>
      {/* other app code */}
    </>
  );
}


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <Router
    future=
        {{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
      <Routes>
        
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
