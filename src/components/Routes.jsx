import Home from '../pages/Index.jsx';
import NotFound from '../pages/NotFound.jsx'; 
import QAtoPot from '../pages/QAtoPot.jsx';
import Why from '../pages/Why.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Profile from '../pages/Profile.jsx';
import Red_Acknowledment from '../pages/Red_Ack.jsx';

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/qa-to-pot/*',
        element: <QAtoPot />,
    },
    {
        path: '/register1',
        element: <Red_Acknowledment />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/*',
        element: <NotFound /> , 
    },
     {
        path: '/why/*',
        element: <Why />,
    }
];

export default routes;
