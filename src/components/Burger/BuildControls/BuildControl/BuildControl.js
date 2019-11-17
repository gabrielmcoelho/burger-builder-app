import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => {
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.removeIngredients} className={classes.Less}
                    disabled={props.disableLessButton}>Less</button>
            <button onClick={props.addIngredients} className={classes.More}>More</button>
        </div>
    )
};

export default buildControl;