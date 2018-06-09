// import action constants as properties
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0
};

const counterReducer = (state = initialState, action) => {
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
    }

    return state;
};

export default counterReducer;