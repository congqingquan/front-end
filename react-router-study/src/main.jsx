import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';

import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import Contact, { loader as contactLoader, action as contactAction } from './routes/concat.jsx';
import ErrorPage from './error-page.jsx';
import EditContact, { action as editAction } from './routes/edit.jsx';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';

// route config 1
// const router = createBrowserRouter(
//     [
//         {
//             path: '/',
//             element: <Root />,
//             loader: rootLoader,
//             errorElement: <ErrorPage />,
//             action: rootAction,
//             // children: [
//             //     {
//             //         index: true,
//             //         element: <Index />,
//             //     },
//             //     {
//             //         path: 'contacts/:contactId',
//             //         element: <Contact />,
//             //         loader: contactLoader,
//             //         action: contactAction,
//             //     },
//             //     {
//             //         path: 'contacts/:contactId/edit',
//             //         element: <EditContact />,
//             //         loader: contactLoader,
//             //         action: editAction,
//             //     },
//             //     {
//             //         path: 'contacts/:contactId/destroy',
//             //         action: destroyAction,
//             //         errorElement: <div>Oops! There was an error.</div>,
//             //     },
//             // ],
//             children: [
//                 {
//                     errorElement: <ErrorPage />,
//                     children: [
//                         {
//                             index: true,
//                             element: <Index />,
//                         },
//                         {
//                             path: 'contacts/:contactId',
//                             element: <Contact />,
//                             loader: contactLoader,
//                             action: contactAction,
//                         },
//                         {
//                             path: 'contacts/:contactId/edit',
//                             element: <EditContact />,
//                             loader: contactLoader,
//                             action: editAction,
//                         },
//                         {
//                             path: 'contacts/:contactId/destroy',
//                             action: destroyAction,
//                             errorElement: <div>Oops! There was an error.</div>,
//                         },
//                     ],
//                 },
//             ],
//         },
//         // {
//         //     path: 'contacts/:contactId',
//         //     element: <Contact />,
//         // },
//     ],
//     {},
// );

// route config 2: jsx
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Index />} />
                <Route path="contacts/:contactId" element={<Contact />} loader={contactLoader} action={contactAction} />
                <Route
                    path="contacts/:contactId/edit"
                    element={<EditContact />}
                    loader={contactLoader}
                    action={editAction}
                />
                <Route path="contacts/:contactId/destroy" action={destroyAction} />
            </Route>
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById('root'), {
    identifierPrefix: 'react-id-',
}).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
