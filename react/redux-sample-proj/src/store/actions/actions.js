export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

// for action creators, convention is to name function the same as
//  action type, but camelCase
export const increment = (config) => {
    return {
        type: INCREMENT
    };
};

export const decrement = (config) => {
    return {
        type: DECREMENT
    };
};

export const add = (value) => {
    return {
        type: ADD,
        value: value
    };
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        value: value
    };
};

export const saveResult = (res) => {
    return {
        type: STORE_RESULT,
        result: res
    };
}

export const storeResult = (res) => {
    // simulate async - reach out to server, for example
    // thunk makes dispatch available
    return (dispatch) => {
        setTimeout(() => {
            // dispatching storeResult again would cause infinite loop,
            //  so need a new action (saveResult)
            dispatch(saveResult(res));
        }, 2000);
    };
};

export const deleteResult = (resElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resElId
    };
};