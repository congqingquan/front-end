// store
import { legacy_createStore, combineReducers } from 'redux';
// reducers
import NumberStateReducer from './NumberState/NumberStateReducer';
import StringStateReducer from './StringState/StringStateReducer';
import MenuItemStateReducer from './MenuItemState/MenuItemStateReducer';

const reducers = combineReducers({
    NumberStateReducer,
    StringStateReducer,
    MenuItemStateReducer
})

// 浏览器中使用 redux 插件，根据后面的两个参数
// const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = legacy_createStore(reducers);

export default store;