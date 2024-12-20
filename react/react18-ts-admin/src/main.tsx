import ReactDOM from 'react-dom/client';
// css 引入顺序
// 1. 重置样式
import 'reset-css';
// 2. UI 框架样式
// 3. 组件样式
import '@/assets/styles/global.scss';
// 4. 垃圾
// import { Provider } from 'react-redux';
// import store from '@/store';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <Provider store={store}>
    //     <React.StrictMode>
    //         <RouterAuth>
    //             <RouterProvider router={Router}></RouterProvider>
    //         </RouterAuth>
    //     </React.StrictMode>
    // </Provider>,

    // <React.StrictMode>
        <App/>
    // </React.StrictMode>
);
