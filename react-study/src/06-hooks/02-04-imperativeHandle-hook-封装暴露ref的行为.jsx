import {forwardRef, useImperativeHandle, useRef} from "react";

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// imperativeHandle: 封装ref并设置对外暴露的可调用行为.
// 1. 子组件中通过 useImperativeHandle hook 包装父组件传递的 ref hook 变量
// 2. 定义对外暴露的 API 的实例
const Component = forwardRef((props, ref) => {
    let innerRef = useRef(null);
    useImperativeHandle(ref, () => {
        return {
            business() {
                innerRef.current.focus();
                innerRef.current.value = "Cortana";
            }
        }
    });

    return (
        <input type="text" ref={innerRef}/>
    )
});

const App = () => {
    let componentDomRef = useRef(null);

    let handleClick = () => {
        // 此时的 componentDomRef 已经是被 useImperativeHandle hook 包装后的 ref 实例
        console.log(componentDomRef);
        componentDomRef.current.business();
    }

    return (
        <div style={boxStyle}>
            <button onClick={handleClick}>Click me !!!</button>
            <Component ref={componentDomRef} />
        </div>
    );
};

export default App;