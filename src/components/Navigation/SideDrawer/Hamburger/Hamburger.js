import React from 'react';
import PropTypes from 'prop-types';

import classes from './Hamburger.css'

const hamburger = (props) => (
    <div className={classes.Hamburger} onClick={props.openSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

hamburger.propTypes = {
    openSideDrawer: PropTypes.func
};

export default hamburger;