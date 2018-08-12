import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

import firebase from '@firebase/app';
import '@firebase/auth';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onButtonPress = () => {
        const { email, password } = this.state;

        // clear error message upon login retry && show spinner
        this.setState({ error: '', loading: true });

        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(() => {
            // sign in failed, so try to create new account
            firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(() => {
                // create user failed :(
                this.setState({ error: 'Authentication Failed.', loading: false })
            });
        });
    }

    renderButton = () => {
        if (this.state.loading) {
            return <Spinner size="small" />
        }
        
        return (
            <Button onPress={this.onButtonPress}>
                Log In
            </Button>
        );
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

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    };
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;

