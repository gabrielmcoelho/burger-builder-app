import React from 'react';

import classes from './BuildControl.css'
import PropTypes from "prop-types";

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

buildControl.propTypes = {
    label: PropTypes.string,
    addIngredients: PropTypes.func,
    removeIngredients: PropTypes.func,
    disableLessButtons: PropTypes.bool
};

export default buildControl;