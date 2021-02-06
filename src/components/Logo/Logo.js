import React from 'react';

import pathToLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={pathToLogo} alt="BurgerBuilderApp"/>
    </div>
);

export default logo;