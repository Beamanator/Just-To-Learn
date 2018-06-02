// import action constants as properties
import * as actionTypes from '../actions';

const initialState = {
    results: []
};

const resultReducer = (state = initialState, action) => {
    // REMEMBER TO RETURN IMMUTABLY UPDATED OBJECT
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // .push modifieds old array
                // .concat returns NEW array
                results: state.results.concat({
                    id: new Date(),
                    value: action.result

                    // can't use state.counter after splitting reducers
                    // into their own files - not available on global
                    // state (state.ctr.counter) AND not accessible in this
                    // reducer. Instead, do above method
                    // value: state.counter 
                })
            };

        case actionTypes.DELETE_RESULT:
            const id = 2;
            // method 1:
            // const newArray = [...state.results];
            // newArray.splice(id, 1);

            // method 2:
            const updatedArray = state.results
                .filter(result =>
                    result.id !== action.resultElId);

            return {
                ...state,
                // results: newArray,
                results: updatedArray
            }
    }

    return state;
};

export default resultReducer;