import React from 'react';

import classes from './Button.css'
import PropTypes from "prop-types";

const button = (props) => (
    <button onClick={props.clickHandler} className={[classes.Button, classes[props.type]].join(' ')}>
        {props.children}
    </button>
);

button.propTypes = {
    type: PropTypes.string,
    clickHandler: PropTypes.func
};

export default button;