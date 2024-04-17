import { createBrowserRouter } from 'react-router-dom';
import App from '@/views/App';
import Home from '@/views/Home';
import Welcome from '@/views/Welcome';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Welcome />,
            },
            {
                path: '/home',
                element: <Home />,
            },
        ],
    },
]);

export default Router;
