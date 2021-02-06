import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css'

const backDrop = (props) => (
    props.show ? <div onClick={props.hideModal} className={classes.Backdrop}></div> : null
);

backDrop.propTypes = {
    show: PropTypes.bool,
    hideModal: PropTypes.func
};

export default backDrop;