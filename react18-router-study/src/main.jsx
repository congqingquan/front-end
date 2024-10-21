import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import '@/index.css';

import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from '@/routes/root';
import Contact, { loader as contactLoader, action as contactAction } from '@/routes/concat';
import ErrorPage from '@/error-page';
import EditContact, { action as editAction } from '@/routes/edit';
import { action as destroyAction } from '@/routes/destroy';
import Index from '@/routes/index';
import NonNestedPage from '@/routes/test/non-nested-page';

/**
 * 路由的本质，就是在特定元素内渲染不同的组件。
 *
 * 渲染的根元素是哪个？即：ReactDOM.createRoot(document.getElementById('root')) 中指定的元素。
 */

// route config 1
const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            loader: rootLoader,
            errorElement: <ErrorPage />,
            action: rootAction,
            // 1. nested route
            // children: [
            //     {
            //         index: true,
            //         element: <Index />,
            //     },
            //     {
            //         path: 'contacts/:contactId',
            //         element: <Contact />,
            //         loader: contactLoader,
            //         action: contactAction,
            //     },
            //     {
            //         path: 'contacts/:contactId/edit',
            //         element: <EditContact />,
            //         loader: contactLoader,
            //         action: editAction,
            //     },
            //     {
            //         path: 'contacts/:contactId/destroy',
            //         action: destroyAction,
            //         errorElement: <div>Oops! There was an error.</div>,
            //     },
            // ],
            children: [
                {
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            index: true,
                            element: <Index />,
                        },
                        {
                            path: 'contacts/:contactId',
                            element: <Contact />,
                            loader: contactLoader,
                            action: contactAction,
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
            ],
        },

        // 2. non-nested route: 在 index.html 的整个 #root 元素下渲染 NonNestPage 组件
        {
            path: '/non-nested-page',
            element: <NonNestedPage />,
        },
    ],
    {},
);

// route config 2: jsx
// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
//             <Route errorElement={<ErrorPage />}>
//                 <Route index element={<Index />} />
//                 <Route path="contacts/:contactId" element={<Contact />} loader={contactLoader} action={contactAction} />
//                 <Route
//                     path="contacts/:contactId/edit"
//                     element={<EditContact />}
//                     loader={contactLoader}
//                     action={editAction}
//                 />
//                 <Route path="contacts/:contactId/destroy" action={destroyAction} />
//             </Route>
//         </Route>,
//     ),
// );

ReactDOM.createRoot(document.getElementById('root'), {
    identifierPrefix: 'react-id-',
}).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
