import SassStyle from './02-sass.module.scss';

// 局部、全局的 sass 规则，与 css 一致

const App = () => {
    return <div className={SassStyle.sassBox}>Sass box</div>;
};
export default App;
