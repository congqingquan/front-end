import {forwardRef, useRef} from "react";

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// ref 绑定组件 dom
// 1. 父组件将 ref hook 变量绑定到子组件的 ref 属性
// 2. forwardRef 包装子组件
// 3. 子组件 ref 属性绑定 ref 形参 (该 ref 形数即父组件传递的 ref hook 变量)

const Component = forwardRef((props, ref) => {
    return (
        <input type="text" ref={ref}/>
    )
});

const App = () => {
    let componentDomRef = useRef(null);

    let handleClick = () => {
        componentDomRef.current.focus();
        componentDomRef.current.value = "Cortana";
    }

    return (
        <div style={boxStyle}>
            <button onClick={handleClick}>Click me !!!</button>
            <Component ref={componentDomRef} />
        </div>
    );
};

export default App;