import { Fragment } from 'react';

const App = () => {
    let dataList = [
        { id: 1, name: 'halo' },
        { id: 2, name: 'cortana' },
        { id: 3, name: 'john' },
    ];

    return (
        <>
            <h2>1. 哪些数据可以渲染，哪些不可以，如何解决</h2>
            {/* 1) 不会渲染：boolean / '' / null / undefined / 对象 / 函数 */}
            {/* 2) 解决方式：1.拼接空字符串 2.对于对象类型需要特殊处理：JSON.stringify(obj); */}

            {/*<div>{true}</div>*/}
            {/*<div>{false}</div>*/}
            {/*<div>{''}</div>*/}
            {/*<div>{null}</div>*/}
            {/*<div>{undefined}</div>*/}
            {/*<div>{function () {}}</div>*/}
            {/*<div>{{ name: 'cortana' }}</div>*/}

            <div>{true + ''}</div>
            <div>{false + ''}</div>
            <div>{'' + ''}</div>
            <div>{null + ''}</div>
            <div>{undefined + ''}</div>
            <div>{function () {} + ''}</div>
            <div>{{ name: 'cortana' } + ''}</div>
            <div>{JSON.stringify({ name: 'cortana' })}</div>

            <h2>2. 逻辑运算参与渲染</h2>
            {true && <div>Render &&</div>}
            {true ? <div>Render true</div> : <div>Render false</div>}

            <h2>3. 渲染数组</h2>

            {/* 默认通过 [].join("") 打散数组 */}
            {['A', 'B', 'C']}

            {/* 渲染接口数据：key 不建议为索引，因为当数组元素被移除时，元素的 index 就会发生改变，则 key 也会发生改变*/}
            <ul>
                {dataList.map((el) => (
                    <li key={el.id}>{el.name}</li>
                ))}
            </ul>
        </>
    );
};

export default App;
