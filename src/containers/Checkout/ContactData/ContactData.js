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
        const formData = {};
        for(let field in this.state.order){
            formData[field] = this.state.order[field].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData
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
                <form onSubmit={this.orderHandler}>
                    {inputs}
                    <Button type="Success">ORDER</Button>
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