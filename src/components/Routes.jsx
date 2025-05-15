import Home from '../pages/Index.jsx';
import NotFound from '../pages/NotFound.jsx'; 
import QAtoPot from '../pages/QAtoPot.jsx';

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
        path: '/not-found',
        element: <NotFound /> , 
    }
];

export default routes;
