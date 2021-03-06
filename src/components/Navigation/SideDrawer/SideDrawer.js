import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliar/Auxiliar'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
       attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} hideModal={props.backdropClicked}/>
            <div className={attachedClasses.join(' ')} onClick={props.backdropClicked}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Aux>
    );
};

sideDrawer.propTypes = {
  open: PropTypes.bool,
  backdropClicked: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

export default sideDrawer;