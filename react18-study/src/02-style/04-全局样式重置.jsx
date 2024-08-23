// 在 main.jsx 中引入 04-global-reset.css 即可实现全局重置样式
const App = () => {
    return (
        <div style={{ width: 150, height: 150, border: 'solid 2px red' }}>
            <ul style={{ marginLeft: 50 }}>
                <li>HALO</li>
                <li>Cortana</li>
                <li>John</li>
            </ul>
        </div>
    );
};
export default App;
