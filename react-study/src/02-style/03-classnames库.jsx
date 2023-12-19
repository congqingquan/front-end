import ClassNamesSassStyle from './03-classnames-sass.module.scss';
import ClassNames from 'classnames';

const classNameArr = ['boxName1', 'boxName2', 'boxName3'];

// classNames 库：灵活管理多个 class 值
let classNames = ClassNames({
    boxName1: true,
    boxName2: true,
    boxName3: false,
    // 引入 sass 文件中的选择名
    [ClassNamesSassStyle.sassBox]: true,
});

const App = () => {
    // return <div className={classNameArr.join(' ')}>ClassNames box</div>;
    return <div className={classNames}>ClassNames box</div>;
};
export default App;
