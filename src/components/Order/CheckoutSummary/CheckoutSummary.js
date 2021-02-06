import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'
import { Link } from 'react-router-dom';

const checkoutSummary = (props) => {
    return (
      <div className={classes.CheckoutSummary}>
          <h1>We hope it tastes well!</h1>
          <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients} />
          </div>
          <Link to="/"><Button type="Danger" >CANCEL</Button></Link>
          <Button type="Danger" clickHandler={props.checkoutContinuedHandler}>CONTINUE</Button>
      </div>
    );
};

export default checkoutSummary;