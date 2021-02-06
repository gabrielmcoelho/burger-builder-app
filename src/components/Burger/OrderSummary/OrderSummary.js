import React from 'react';

import Aux from '../../../hoc/Auxiliar/Auxiliar'
import Button from '../../UI/Button/Button'
import PropTypes from "prop-types";

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredient => {
            return (
                <li key={ingredient}>
                    <span style={{textTransform: 'capitalize'}}>{ingredient}</span>
                    : {props.ingredients[ingredient]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button type="Danger" clickHandler={props.cancelPurchase}>CANCEL</Button>
            <Button type="Success" clickHandler={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    );
};

orderSummary.propTypes = {
    cancelPurchase: PropTypes.func,
    continuePurchase: PropTypes.func,
    ingredients: PropTypes.object,
    price: PropTypes.number
};

export default orderSummary;