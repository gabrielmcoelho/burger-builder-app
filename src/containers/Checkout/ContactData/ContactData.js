import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import axios from "../../../axios-orders";
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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{display: 'fastest', value: 'fastest'}, {display: 'cheapest', value: 'cheapest'}]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Coelho',
                address: {
                    street: '123',
                    zipCode: '123',
                    country: '123'
                },
                email: '123@123.com'
            },
            deliveryMethod: 'cheapest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            })
    };

    inputChangedHandler = (event, inputName) => {
        const newOrder = {...this.state.order};
        newOrder[inputName].value = event.target.value;
        this.setState({order: newOrder});
    };

    render() {
        let form = null;
        let inputs = [];
        if(this.state.loading) {
            form = <Spinner/>
        }
        else{

            for(let input in this.state.order) {
                inputs.push(<Input key={input} name={input} elementType={this.state.order[input].elementType}
                                     elementConfig={this.state.order[input].elementConfig} changed={(event) => this.inputChangedHandler(event, input)}/>);
            }

            form = (
                <form>
                    {inputs}
                    <Button type="Success" clickHandler={this.orderHandler}>ORDER</Button>
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

export default withRouter(ContactData);