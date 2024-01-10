import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';

import Root from './routes/root';
import Contact from './routes/concat.jsx';
import ErrorPage from './error-page.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact />,
            },
        ],
    },
    // {
    //     path: 'contacts/:contactId',
    //     element: <Contact />,
    // },
]);

ReactDOM.createRoot(document.getElementById('root'), {
    identifierPrefix: 'react-id-',
}).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
