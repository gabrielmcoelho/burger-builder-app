import React from 'react';

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

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
            <p>Continue to checkout?</p>
            <Button type="Danger" clickHandler={props.cancelPurchase}>CANCEL</Button>
            <Button type="Success" clickHandler={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;