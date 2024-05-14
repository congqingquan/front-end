// store
import { legacy_createStore, combineReducers } from 'redux';
// reducers
import NumberStateReducer from './NumberState/NumberStateReducer';
import StringStateReducer from './StringState/StringStateReducer';

const reducers = combineReducers({
    NumberStateReducer,
    StringStateReducer
})

const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;