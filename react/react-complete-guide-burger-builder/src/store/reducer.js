import * as actionTypes from './actions';

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state
            };
    }

    return state;
}

export default reducer;