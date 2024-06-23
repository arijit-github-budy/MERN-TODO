import { combineReducers } from 'redux';
import authReducer from './reducers/auth/auth.reducer.js';
import todoReducer from './reducers/todo/todo.reducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer
});

export default rootReducer;