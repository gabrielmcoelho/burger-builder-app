import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Hamburger from '../SideDrawer/Hamburger/Hamburger'
import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Hamburger openSideDrawer={props.openSideDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
    </header>
);

toolbar.propTypes = {
    openSideDrawer: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default toolbar;