import { useMemo, useRef } from 'react';
import { useVirtualList } from 'ahooks';

// useVirtualList: 提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。

const App = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);

    // 缓存数据
    const originalList = useMemo(() => Array.from(Array(99_999).keys()), []);

    const [list] = useVirtualList(originalList, {
        containerTarget: containerRef, // 外面容器，支持 DOM 节点或者 Ref 对象
        wrapperTarget: wrapperRef, // 内部容器，支持 DOM 节点或者 Ref 对象
        itemHeight: 60, // 行高度，静态高度可以直接写入像素值，动态高度可传入函数
        overscan: 10, // 视区上、下额外展示的 DOM 节点数量
    });
    return (
        <>
            <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
                <div ref={wrapperRef}>
                    {list.map((ele) => (
                        <div
                            style={{
                                height: 52,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #e8e8e8',
                                marginBottom: 8,
                            }}
                            key={ele.index}>
                            Row: {ele.data}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default App;
