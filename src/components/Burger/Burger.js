import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    let ingredientsList = Object.keys(props.ingredients).map((type) => {
        return [...Array(props.ingredients[type])].map((_, index) => {
            return (<BurgerIngredient key={type+index} type={type}/>);
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (ingredientsList.length === 0){
        ingredientsList = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {ingredientsList}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
};

export default burger;