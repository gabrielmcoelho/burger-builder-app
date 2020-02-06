import React, { Component } from 'react';

import classes from './Order.css';

const order = (props) => {

    const ingredients = [];

    for (let ingredient in props.ingredients){
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span className={classes.Ingredient} key={ingredient.name}>{ingredient.name} ({ingredient.amount}) </span>;
    });

    return (
        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;