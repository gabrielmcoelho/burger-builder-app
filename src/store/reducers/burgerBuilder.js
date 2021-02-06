import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const changeIngredientUnit = (state, ingredientName, unitChange) => {
    const updatedIngredients = updateObject(state.ingredients, {[ingredientName]: state.ingredients[ingredientName] + unitChange });
    const updatedTotalPrice = state.totalPrice + INGREDIENT_PRICES[ingredientName];
    return updateObject(state, {ingredients: updatedIngredients, totalPrice: updatedTotalPrice, building: true});
}

const setIngredients = (state, ingredients) => {
    let newPrice = Object.entries(ingredients).reduce((acc, ingredientEntry) => { 
        return acc + INGREDIENT_PRICES[ingredientEntry[0]]*ingredientEntry[1] 
    }, 4);
    return updateObject(state, {ingredients: ingredients, totalPrice: newPrice, error: false, building: false });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return changeIngredientUnit(state, action.ingredientName, 1);
        case actionTypes.REMOVE_INGREDIENT:
            return changeIngredientUnit(state, action.ingredientName, -1);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action.ingredients);
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return updateObject(state, {error: true});
        default: return state;
    }
};

export default reducer;