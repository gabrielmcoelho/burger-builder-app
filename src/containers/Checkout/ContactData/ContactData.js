import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
            country: ''
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
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="text" name="country" placeholder="Country"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
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