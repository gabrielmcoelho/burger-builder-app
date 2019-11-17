import React from 'react';

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
            {controls.map(control => (
                <BuildControl key={control.label} label={control.label}
                              addIngredients={() => props.addIngredients(control.type)}
                              removeIngredients={() => props.removeIngredients(control.type)}/>))
            }
        </div>
    )
};

export default buildControls;