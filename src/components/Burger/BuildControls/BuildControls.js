import React from 'react';
import PropTypes from "prop-types";

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'}
];

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl key={control.label} label={control.label}
                              addIngredients={() => props.addIngredients(control.type)}
                              removeIngredients={() => props.removeIngredients(control.type)}
                              disableLessButton={props.disableLessButtons[control.type]}/>))
            }
<button onClick={props.purchase} className={classes.OrderButton} disabled={!props.purchasable}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
        </div>
    )
};

buildControls.propTypes = {
    price: PropTypes.number,
    addIngredients: PropTypes.func,
    removeIngredients: PropTypes.func,
    disableLessButtons: PropTypes.object,
    purchase: PropTypes.func,
    purchasable: PropTypes.bool,
    isAuthenticated: PropTypes.bool
};

export default buildControls;