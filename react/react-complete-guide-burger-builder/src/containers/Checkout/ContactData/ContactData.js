import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            price: this.props.price,
            customer: {
                name: 'The Beamanator',
                address: {
                    street: 'Street 9',
                    zipCode: '01234',
                    country: 'Egypt'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
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