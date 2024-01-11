import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import Contact, { loader as contactLoader } from './routes/concat.jsx';
import ErrorPage from './error-page.jsx';
import EditContact, { action as editAction } from './routes/edit.jsx';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            loader: rootLoader,
            errorElement: <ErrorPage />,
            action: rootAction,
            children: [
                {
                    index: true,
                    element: <Index />,
                },
                {
                    path: 'contacts/:contactId',
                    element: <Contact />,
                    loader: contactLoader,
                },
                {
                    path: 'contacts/:contactId/edit',
                    element: <EditContact />,
                    loader: contactLoader,
                    action: editAction,
                },
                {
                    path: 'contacts/:contactId/destroy',
                    action: destroyAction,
                    errorElement: <div>Oops! There was an error.</div>,
                },
            ],
        },
        // {
        //     path: 'contacts/:contactId',
        //     element: <Contact />,
        // },
    ],
    {},
);

ReactDOM.createRoot(document.getElementById('root'), {
    identifierPrefix: 'react-id-',
}).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
