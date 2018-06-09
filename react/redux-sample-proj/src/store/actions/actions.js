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

export const add = (config) => {
    return {
        type: ADD,
        ...config
    };
};

export const subtract = (config) => {
    return {
        type: SUBTRACT,
        ...config
    };
};

export const storeResult = (config) => {
    return {
        type: STORE_RESULT,
        ...config
    };
};

export const deleteResult = (config) => {
    return {
        type: DELETE_RESULT,
        ...config
    };
};