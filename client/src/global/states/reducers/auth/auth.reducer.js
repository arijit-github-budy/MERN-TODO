import { REGISTRATION, LOGIN, LOGOUT } from './auth.types';


const INITIAL_STATE = {
    user: {},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTRATION:
            return {
                ...state, user: action.payload,
            };

        case LOGIN:
            return {
                ...state, user: action.payload,
            };

        case LOGOUT:
            return {
                ...state, user: action.payload,
            };
        default: return state;
    }
};

export default reducer;