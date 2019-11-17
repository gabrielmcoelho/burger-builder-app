import React, { Component } from 'react';

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        this.updatePurchaseState(updatedIngredients);
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
            this.updatePurchaseState(updatedIngredients);
        }
    };

    updatePurchaseState = (updatedIngredients) => {
        const ingredientsSum = Object.keys(updatedIngredients)
            .map(ingredient => updatedIngredients[ingredient])
            .reduce((sum, ingredientCount) => sum + ingredientCount, 0);
        this.setState({purchasable: ingredientsSum > 0});
    };

    purchaseHandler = () => {
      this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    render() {

        /* if there's no ingredient X, disable X's less button */
        const disableLessButtons = {
            ...this.state.ingredients
        };

        for(let type in disableLessButtons) {
            disableLessButtons[type] = disableLessButtons[type] <= 0;
        }

        return (
          <Aux>
              <Modal show={this.state.purchasing} hideModal={this.purchaseCancelHandler}>
                  <OrderSummary ingredients={this.state.ingredients}/>
              </Modal>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls price={this.state.totalPrice}
                             addIngredients={this.addIngredientHandler}
                             removeIngredients={this.removeIngredientHandler}
                             disableLessButtons={disableLessButtons}
                             purchasable={this.state.purchasable}
                             purchase={this.purchaseHandler}/>
          </Aux>
        );
    }
}

export default BurgerBuilder;