// import action constants as properties
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const resultReducer = (state = initialState, action) => {
    // REMEMBER TO RETURN IMMUTABLY UPDATED OBJECT
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {
                // .push modifieds old array
                // .concat returns NEW array
                results: state.results.concat({
                    id: new Date(),
                    value: action.result
                })
            });

        case actionTypes.DELETE_RESULT:
            // method 1:
            // const newArray = [...state.results];
            // newArray.splice(id, 1);

            // method 2:
            const updatedArray = state.results
                .filter(result =>
                    result.id !== action.resultElId);

            return updateObject(state, {
                results: updatedArray
            });
    }

    return state;
};

export default resultReducer;