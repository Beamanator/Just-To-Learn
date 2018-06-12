import * as actionTypes from '../actions/actionTypes';
import { updatedObject, updateObject } from '../utils';

const initialState = {
    // TODO: get initial state from firebase
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]:
                state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice +
                    INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredientR = { [action.ingredientName]:
                state.ingredients[action.ingredientName] - 1 }
            const updatedIngredientsR = updateObject(state.ingredients, updatedIngredientR);
            
            const updatedStateR = {
                ingredients: updatedIngredientsR,
                totalPrice: state.totalPrice -
                    INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedStateR);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    // method 1 for setting order ingredients display
                    //  on burger. Can also make a position property
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: initialState.totalPrice,
                error: false
            });

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;
    }
}

export default reducer;