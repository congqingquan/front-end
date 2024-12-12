import './01-global-style.css';
import LocalStyle from './01-local-style.module.css';

// 1. 行内样式: 样式对象
// 1) 默认会追加 px 单位
// 2) 非驼峰行形式的属性需要转为驼峰形式，因为 js 中无法解析对象中的属性名的中横线 "-"
// const App = () => {
//     const lineStyle = { width: 100, height: '100px', backgroundColor: 'red' };
//     return <div style={lineStyle}>Hello React !</div>;
// };

// 2. 全局样式: 直接引入样式文件即可
// const App = () => {
//     return <div className="globalBox">Global box in local jsx</div>;
// };

// 3. 局部样式:
// 1) 定义 css 文件，名称必须以 module.css 结尾
// 2) JSX 文件引入局部样式文件
// 3) 手动在元素上添加选择属性。选择属性值经过编译后，会被追加随机码，如：_localBox_46rg9_1，这样使得唯一。
//    由于这个特性，即使元素上硬编码声明了 css 文件中的同名选择属性值，但由于编译后会选择属性值会追加随机码，所以也无法匹配上。实现了局部样式。
const App = () => {
    // className 经过编译后，会被追加随机码，如：_localBox_46rg9_1

    // 4) 中线选择值：
    // return <div className={LocalStyle.local-box}>Local box in local jsx</div>; // box is not defined
    // 4.1) 字符串的形式编写
    // return <div className={LocalStyle['local-box']}>Local box in local jsx</div>;
    // 4.2) vite 脚手架中配置可以通过驼峰的形式声明中线选择值
    return <div className={LocalStyle.localBox}>Local box in local jsx</div>;
};
export default App;
