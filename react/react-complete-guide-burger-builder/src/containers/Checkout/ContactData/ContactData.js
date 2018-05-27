import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            // NOTE: Can make this cleaner when working with it myself
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
                    placeholder: 'Street'
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
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            // Note: in production, calculate total price on
            // server so data can't be manipulated by user
            price: this.props.price
        };

        // send order to FB
        axios.post('/orders.json', order)
        .then(response => {
            // console.log(response);
            this.setState({
                loading: false // hide spinner
            });
            this.props.history.push('/');
        })
        .catch(error => {
            // console.log(error);
            this.setState({
                loading: false // hide spinner
            });
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // NOTE: cloning the outer form object DOES NOT do a deep clone
        // since there are multiple levels of objects! So don't JUST
        // do this:
        // const updatedOrderForm = {...this.state.orderForm}

        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = updatedOrderForm[inputIdentifier] = {
            ...updatedOrderForm[inputIdentifier]
        };
        // NOTE: there's still another layer that won't be cloned deeply
        // (the elementConfig) -> but we're not updating it so that's ok
        // here. If you want to change it, CLONE IT TOO!
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({
            orderForm: updatedOrderForm
        });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;