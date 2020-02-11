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
                elementType: 'select',
                elementConfig: {
                    options: [{display: 'fastest', value: 'fastest'}, {display: 'cheapest', value: 'cheapest'}]
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
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

    render() {
        let form = null;
        if(this.state.loading) {
            form = <Spinner/>
        }
        else{
            form = (
                <form>
                    <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                    <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
                    <Input inputtype="input" type="text" name="country" placeholder="Country"/>
                    <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                    <Input inputtype="input" type="text" name="postal" placeholder="Postal code"/>
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