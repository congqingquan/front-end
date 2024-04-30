// store
import { legacy_createStore, combineReducers } from 'redux';
// reducers
import NumberStatusReducer from './NumberStatus/reducer';

const reducers = combineReducers({
    NumberStatusReducer
})

const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;