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

        case actionTypes.LOGIN_ERROR:
            console.log('signout error', action.err);
            return state;
        case actionTypes.SIGNOUT_SUCCESS:
            console.log('signout success');
            return state;

        default:
            return state;
    }
}

export default authReducer;