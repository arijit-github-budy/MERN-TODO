import { combineReducers } from 'redux';
import authReducer from './reducers/auth/auth.reducer.js';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;