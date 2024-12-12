import { useState } from 'react';
import { createPortal } from 'react-dom';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// 将参数 dom 节点渲染到指定 dom 位置

const Portal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {/* 使用场景：弹出莫弹框在页面中心 */}

            {/*<button onClick={() => setShowModal(true)}>不使用 portal 展示模态（modal）</button>*/}
            {/*{showModal && (*/}
            {/*    <div className="modal">*/}
            {/*        <div>这是一个模态对话框</div>*/}
            {/*        <button onClick={() => setShowModal(false)}>关闭</button>*/}
            {/*    </div>*/}
            {/*)}*/}

            <button onClick={() => setShowModal(true)}>使用 portal 展示模态（modal）</button>
            {showModal &&
                createPortal(
                    <div className="modal">
                        <div>这是一个模态对话框</div>
                        <button onClick={() => setShowModal(false)}>关闭</button>
                    </div>,
                    document.body,
                )}
        </>
    );
};

const App = () => {
    // 必须在渲染代码中设置，否则不生效
    // createPortal(<span>Portal</span>, document.querySelector('body'));

    return (
        <div style={boxStyle}>
            Hello APP
            {/*{createPortal(<span>Portal</span>, document.querySelector('body'))}*/}
            <Portal />
        </div>
    );
};

export default App;
