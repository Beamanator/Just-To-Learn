// import action constants as properties
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result =>
            result.id !== action.resultElId);
    
    return (state, {
        results: updatedArray
    });
}

const resultReducer = (state = initialState, action) => {
    // REMEMBER TO RETURN IMMUTABLY UPDATED OBJECT
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result}) });
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
    }

    return state;
};

export default resultReducer;