import React from 'react';

import classes from './Hamburger.css'

const hamburger = (props) => (
    <div className={classes.Hamburger} onClick={props.openSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburger;