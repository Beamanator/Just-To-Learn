import axios from 'axios';

import * as actionTypes from './actionTypes';

// used to set loading state, maybe add a spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        // ... authenticate user
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDiiAjpdPkryEXyFao1rNoFysM-f_Ondvg';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDiiAjpdPkryEXyFao1rNoFysM-f_Ondvg';
        }

        axios.post(url, authData)
        .then(res => {
            console.log(res);
            dispatch(authSuccess(
                res.data.idToken,
                res.data.localId
            ));
            dispatch(checkAuthTimeout(
                res.data.expiresIn
            ));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};