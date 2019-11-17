import React from 'react';

import classes from './Backdrop.css'

const backDrop = (props) => (
    props.show ? <div onClick={props.hideModal} className={classes.Backdrop}></div> : null
);

export default backDrop;