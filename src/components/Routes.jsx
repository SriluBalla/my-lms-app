import Home from '../pages/Index.jsx';
import NotFound from '../pages/NotFound.jsx'; 
import QAtoPot from '../pages/QAtoPot.jsx';
import Why from '../pages/Why.jsx';

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
        path: '/why/*',
        element: <Why />,
    },
    {
        path: '/*',
        element: <NotFound /> , 
    }
];

export default routes;
