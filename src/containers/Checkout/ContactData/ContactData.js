import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/order';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        order: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{display: 'fastest', value: 'fastest'}, {display: 'cheapest', value: 'cheapest'}]
                },
                value: 'cheapest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let field in this.state.order){
            formData[field] = this.state.order[field].value;
        }
        const orderData = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: formData
        };
        this.props.purchaseBurger(orderData);
    };

    checkValidity = (value, rules) => {
        let isValid = false;

        if(!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    };

    inputChangedHandler = (event, inputName) => {
        // update form when input changes
        const newOrder = {...this.state.order};
        newOrder[inputName].value = event.target.value;
        newOrder[inputName].valid = this.checkValidity(newOrder[inputName].value, newOrder[inputName].validation);
        newOrder[inputName].touched = true;
        // check if all inputs are valid and, if so, validate form
        let formIsValid = true;
        for(let input in newOrder) {
            formIsValid = newOrder[input].valid && formIsValid;
        }
        this.setState({order: newOrder, formIsValid: formIsValid});
    };

    render() {
        let form = null;
        let inputs = [];
        if(this.props.loading) {
            form = <Spinner/>
        }
        else{

            for(let input in this.state.order) {
                inputs.push(<Input key={input}
                                   name={input}
                                   elementType={this.state.order[input].elementType}
                                   invalid={!this.state.order[input].valid}
                                   shouldValidate={this.state.order[input].validation}
                                   touched={this.state.order[input].touched}
                                   elementConfig={this.state.order[input].elementConfig}
                                   changed={(event) => this.inputChangedHandler(event, input)}/>);
            }

            form = (
                <form onSubmit={this.orderHandler}>
                    {inputs}
                    <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));