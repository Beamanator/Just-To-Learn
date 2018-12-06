import * as actionTypes from '../actions/actionTypes';

const initState = {
    authError: null,
};

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_ERROR:
            console.log('login error');
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

        default:
            return state;
    }
}

export default authReducer;