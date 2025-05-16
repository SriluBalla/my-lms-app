import Home from '../pages/Index.jsx';
import NotFound from '../pages/NotFound.jsx'; 
import QAtoPot from '../pages/QAtoPot.jsx';
import Why from '../pages/Why.jsx';
import Register from '../pages/Register.jsx';

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/qa-to-pot/*',
        element: <QAtoPot />,
    },
    {
        path: '/register',
        element: <Register />,
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
