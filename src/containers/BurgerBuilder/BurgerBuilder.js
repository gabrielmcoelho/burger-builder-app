import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: error});
            })
    }

    isBurgerPurchasable = (updatedIngredients) => {
        const ingredientsSum = Object.keys(updatedIngredients)
            .map(ingredient => updatedIngredients[ingredient])
            .reduce((sum, ingredientCount) => sum + ingredientCount, 0);
        return ingredientsSum > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {

        /* if there's no ingredient X, disable X's less button */
        const disableLessButtons = {
            ...this.props.ings
        };

        for(let type in disableLessButtons) {
            disableLessButtons[type] = disableLessButtons[type] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <h4 style={{textAlign: 'center'}}>Ingredients can't be loaded</h4> : <Spinner/>;

        if(this.props.ings) {
            orderSummary = <OrderSummary cancelPurchase={this.purchaseCancelHandler}
                          continuePurchase={this.purchaseContinueHandler}
                          ingredients={this.props.ings} price={this.props.price}/>;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls price={this.props.price} addIngredients={this.props.onIngredientAdded}
                                   removeIngredients={this.props.onIngredientRemoved}
                                   disableLessButtons={disableLessButtons}
                                   purchasable={this.isBurgerPurchasable(this.props.ings)} purchase={this.purchaseHandler}/>
                </Aux>
            );
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
          <Aux>
              <Modal show={this.state.purchasing} hideModal={this.purchaseCancelHandler} aux={this.state.loading}>
                  {orderSummary}
              </Modal>
              {burger}
          </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));