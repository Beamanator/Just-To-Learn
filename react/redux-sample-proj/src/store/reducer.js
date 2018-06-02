const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    // REMEMBER TO RETURN IMMUTABLY UPDATED OBJECT
    switch (action.type) {
        case 'INCREMENT':
            // method 1
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        
        case 'DECREMENT':
            // method 2
            return {
                ...state,
                counter: state.counter - 1
            };

        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            };

        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            };
        
        case 'STORE_RESULT':
            return {
                ...state,
                // .push modifieds old array
                // .concat returns NEW array
                results: state.results.concat({
                    id: new Date(),
                    value: state.counter
                })
            };
    }

    return state;
};

export default reducer;