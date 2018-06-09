import * as actionTypes from './actionTypes';

export const increment = (config) => {
    return {
        type: actionTypes.INCREMENT
    };
};

export const decrement = (config) => {
    return {
        type: actionTypes.DECREMENT
    };
};

export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    };
};

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        value: value
    };
};