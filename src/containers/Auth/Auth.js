import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/auth';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.isSignup) {
            this.props.authSignup(this.state.controls.email.value, this.state.controls.password.value);
        } else {
            this.props.authSignin(this.state.controls.email.value, this.state.controls.password.value);
        }
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render() {
        let form = null;
        let inputs = [];
        for(let input in this.state.controls) {
            inputs.push(<Input key={input}
                               name={input}
                               elementType={this.state.controls[input].elementType}
                               invalid={!this.state.controls[input].valid}
                               shouldValidate={this.state.controls[input].validation}
                               touched={this.state.controls[input].touched}
                               elementConfig={this.state.controls[input].elementConfig} changed={(event) => this.inputChangedHandler(event, input)}/>);
        }

        form = (
            <form onSubmit={this.formSubmitHandler}>
                {inputs}
                <Button type="Success">SUBMIT</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                {form}
                <Button type="Danger" clickHandler={this.switchAuthMode}>Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authSignup: (email, password) => dispatch(actions.authSignup(email, password)),
        authSignin: (email, password) => dispatch(actions.authSignin(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);