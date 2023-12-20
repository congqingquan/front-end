/*
    JSX 是 JavaScript 的语法扩展，可以使你在 JS 文件中书写类似 HTML 的标签，并具备 JS 的可编程能力。
    1. JSX 是一种语法扩展，而 React 则是一个 JS 库
    2. 浏览器是不认识 JSX 的，所以利用脚手架的 SWC 或 Babel 进行编译，转换成浏览器识别的代码
    3. JSX and React 是相互独立的东西，但是经常一起配合使用，所以可以单独应用他们的任意一个的
*/

/*
    1. 基本语法
    const App = () => {
        return <div>Hello React !</div>;
    };
    function App() {
        return <div>Hello React !</div>;
    }
*/

/*
    2. 括号可以省略
    const App = () => <div>Hello React !</div>;
    function App() {
        return (
            <div>Hello React !</div>
        );
    };
*/

// 3. 打印 react 将 jsx 转换后的对象
console.log(<div className="cortana"></div>);

// 4. 定义 JSX 变量
const jsxVar = <div className="myJsx"></div>;

const App = () => {
    return <div>Hello React !</div>;
};
export default App;
