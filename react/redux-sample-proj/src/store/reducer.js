// import action constants as properties
import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    // REMEMBER TO RETURN IMMUTABLY UPDATED OBJECT
    switch (action.type) {
        case actionTypes.INCREMENT:
            // method 1
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        
        case actionTypes.DECREMENT:
            // method 2
            return {
                ...state,
                counter: state.counter - 1
            };

        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            };

        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            };
        
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // .push modifieds old array
                // .concat returns NEW array
                results: state.results.concat({
                    id: new Date(),
                    value: state.counter
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

export default reducer;