import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';
import firebase from '@firebase/app';
import '@firebase/auth';

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }

    onButtonPress = () => {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        onChangeText={text =>
                            this.setState({ email: text })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={text =>
                            this.setState({ password: text })}
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress}>
                        Log In
                    </Button>
                </CardSection>
            </Card>
        );
    };
}

export default LoginForm;

