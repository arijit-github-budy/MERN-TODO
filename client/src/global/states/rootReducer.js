import { combineReducers } from 'redux';
import counterReducer from './reducers/counter/counter.reducer.js';

const rootReducer = combineReducers({
    counter: counterReducer
});

export default rootReducer;