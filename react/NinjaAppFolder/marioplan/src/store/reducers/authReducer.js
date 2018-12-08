import * as actionTypes from '../actions/actionTypes';

const initState = {
    authError: null,
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_ERROR:
            console.log('login error', action.err);
            return {
                ...state,
                authError: 'Login failed',
            };
        case actionTypes.LOGIN_SUCCESS:
            console.log('login success');
            return {
                ...state,
                authError: null,
            };

        case actionTypes.SIGNOUT_ERROR:
            console.log('signout error', action.err);
            return state;
        case actionTypes.SIGNOUT_SUCCESS:
            console.log('signout success');
            return state;

        case actionTypes.SIGNUP_ERROR:
            console.log('signup error', action.err);
            return {
                ...state,
                authError: action.err.message,
            }
        case actionTypes.SIGNUP_SUCCESS:
            console.log('signup success');
            return {
                ...state,
                authError: null,
            }

        default:
            return state;
    }
}

export default authReducer;