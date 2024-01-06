import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import axios from 'axios';
import moment from 'moment';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// 轮训、Loading Delay、Ready、聚焦、防抖、节流、重试

async function fetchApiData() {
    return (await axios.get('/cart-data.json')).data;
}

// const App = () => {
//     let [readyState, setReadyState] = useState(true);
//
//     let {
//         data = [],
//         loading,
//         run,
//         refresh,
//         mutate,
//     } = useRequest(fetchApiData, {
//         // 1. 轮训
//         // pollingInterval: 1000,
//
//         // 2. Loading Delay: 通过设置 options.loadingDelay，可以延迟 loading 变成 true 的时间，有效防止闪烁。（设置浏览器的网速模式进行测试）
//         // loadingDelay: 1000,
//
//         // 3. Ready
//         // ready: readyState,
//
//         // 4. 聚焦: 在浏览器窗口 refocus 和 revisible 时，会重新发起请求。
//         // refreshOnWindowFocus: true,
//         // focusTimespan: 100, // 重新请求间隔，单位为毫秒
//
//         onSuccess(data, params) {
//             mutate(data.data.sort(() => Math.random() - 0.5));
//         },
//     });
//
//     console.log(readyState);
//
//     return (
//         <div style={boxStyle}>
//             <button onClick={() => setReadyState((prevState) => !prevState)}>{readyState ? 'Stop' : 'Start'}</button>
//             <ul>{loading ? '加载数据中...' : data.map((el) => <li key={el.id}>{el.name}</li>)}</ul>
//         </div>
//     );
// };

const App = () => {
    let {
        data = [],
        run,
        mutate,
    } = useRequest(fetchApiData, {
        // 5. 防抖: 连续点击仅会触发 run 或 runAsync 一次。
        // debounceWait: 1000, // 防抖等待时间， 单位为毫秒，设置后，进入防抖模式

        // 6. 节流: 限制固定时间区间内仅可以触发 run 或 runAsync 一次。
        // throttleWait: 1000, // 频繁触发 run，只会每隔 300ms 执行一次。

        // 7. 重试次数
        retryCount: 3,

        onSuccess(data, params) {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss') + ': success');
            mutate(data.data.sort(() => Math.random() - 0.5));
        },
    });

    return (
        <div style={boxStyle}>
            <button onClick={run}>{'Fetch data'}</button>
            <ul>
                {data.map((el) => (
                    <li key={el.id}>{el.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
