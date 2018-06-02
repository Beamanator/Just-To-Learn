import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    // REMEMBER TO RETURN IMMUTABLY UPDATED OBJECT
    switch (action.type) {
        // add person to array
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.personData.name,
                age: action.personData.age
            };

            return {
                ...state,
                persons: state.persons.concat(newPerson)
            };

        // remove person from array
        case actionTypes.REMOVE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person =>
                    person.id !== action.personId)
            };
    }

    return state;
};

export default reducer;