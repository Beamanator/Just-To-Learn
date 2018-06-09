import * as actionTypes from './actionTypes';

export const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

export const storeResult = (res) => {
    // simulate async - reach out to server, for example
    // thunk makes dispatch available
    return (dispatch, getState) => {
        setTimeout(() => {
            // dispatching storeResult again would cause infinite loop,
            //  so need a new action (saveResult)
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter);
            dispatch(saveResult(res));
        }, 2000);
    };
};

export const deleteResult = (resElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    };
};