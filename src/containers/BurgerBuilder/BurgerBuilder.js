import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 0
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        /* increment ingredient amount by 1 */
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type]+1;
        /* increment totalPrice */
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        /* reflect changes to the state */
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    };

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] > 0){
            /* decrement ingredient amount by 1 */
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = this.state.ingredients[type]-1;
            /* decrement totalPrice */
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            /* reflect changes to the state */
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        }
    };

    render() {
        return (
          <Aux>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls addIngredients={this.addIngredientHandler}
                             removeIngredients={this.removeIngredientHandler}/>
          </Aux>
        );
    }
}

export default BurgerBuilder;