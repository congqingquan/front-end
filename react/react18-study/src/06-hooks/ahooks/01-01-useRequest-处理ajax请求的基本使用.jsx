import axios from 'axios';
import { DependencyList, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';

async function getData(p1, p2) {
    // 2. params [p1, p2] 源于 run 函数的参数
    console.log(`getData param - p1 [${p1}] - p2 [${[p2]}]`);
    let response = await axios.get('/cart-data.json');
    return response.data;
}

const App = () => {
    /**
     * cancel: ƒ()
     * data: undefined
     * error: undefined
     * loading: false
     * mutate: ƒ()
     * params: []
     * refresh: ƒ()
     * refreshAsync: ƒ()
     * run: ƒ()
     * runAsync: ƒ()
     * @type {import("./types").Result<any, []>}
     */
    let {
        data = [],
        loading,
        run,
        refresh,
        mutate,
    } = useRequest(getData, {
        // manual?: boolean;
        // onBefore?: (params: TParams) => void;
        // onSuccess?: (data: TData, params: TParams) => void;
        // onError?: (e: Error, params: TParams) => void;
        // onFinally?: (params: TParams, data?: TData, e?: Error) => void;
        manual: true, // 1. 设置通过 run 函数手动触发，否则会直接触发请求
        onSuccess(data, params) {
            // 2. params [p1, p2] 源于 run 函数的参数
            console.log(data, params);
            mutate(data.data);
        },
    });

    return (
        <div>
            {/* run 函数的参数并最终会传递到 getData 中 */}
            <button onClick={() => run(1, Math.random())}>Fetch data</button>
            {/* 3. refresh 函数会重新再次调用一遍 run 函数，可以观察 getData 函数中的随机数是不会变的 */}
            <button onClick={() => refresh()}>Refresh data</button>
            {/* 4. mutate 函数等价于 React.setState */}
            <button
                onClick={() =>
                    mutate([
                        { id: 1, name: 'Reset data1' },
                        { id: 2, name: 'Reset data2' },
                    ])
                }>
                Reset data
            </button>
            {/* 5. loading 可以设置浏览器的网速模式进行测试 */}
            <ul>{loading ? '加载数据中...' : data.map((el) => <li key={el.id}>{el.name}</li>)}</ul>
        </div>
    );
};

export default App;
