import { Fragment } from 'react';

const VAR_STR = 'string variable';
const myJSX = <div>My JSX</div>;

const App = () => {
    return (
        // 1. 标签要小写
        // <Div>Hello React !</Div> // Unresolved component Div

        // 2. 标签必须闭合
        // <input type="text">
        // <input type="text" />

        // 3. class 与  for 是关键字
        // <div class="cortana"></div> // Attribute class is not allowed here
        // <label for="cortana"></div> // Attribute class is not allowed here

        // 需要做一个映射：class > className / for > htmlFor
        // <div className="cortana"></div>
        // <label htmlFor="input"></label>
        // <input id="input"/>

        // 4. html 中非驼峰命名的属性需要改为驼峰格式，但自定义属性不强制要求为驼峰格式
        // <input onclick={ () => {} }/> // Attribute onclick is not allowed here
        // <input my-attr="cortana" />

        // 5. 大括号内可以写带有返回值的 JS 代码
        // <div title={VAR_STR}>
        //     {1 + 1},
        //     {
        //         // 逻辑、循环等语句是不支持的
        //         // if (true) {}
        //     },
        //     {VAR_STR}
        // </div>

        // 6. 大括号内可以写 JSX
        <>{myJSX}</>

        // 7. 只能有一个根节点
        // <div></div>
        // <div></div>

        // 7.2 解决只能有一个根绝点
        // 1) 外包一层 container <div>
        // <div className="container">
        //     <div className="div1">div1</div>
        //     <div className="div2">div2</div>
        // </div>

        // 2) react 提供的 Fragment 组件: 默认会包一个 <div id="root"> 的盒子
        // <Fragment>
        //     <div className="div1">div1</div>
        //     <div className="div2">div2</div>
        // </Fragment>

        // Fragment 的简写
        // <>
        //     <div className="div1">div1</div>
        //     <div className="div2">div2</div>
        // </>

        // 8. html 转 jsx 的工具网站：https://transform.tools/html-to-jsx (还支持很多其他的转换，如 JSON to Java)
    );
};

export default App;
