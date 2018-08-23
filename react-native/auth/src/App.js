import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

// Note: this is how udemy lecture imports firebase:
// import firebase from 'firebase';
// Note: this is how I have to import (later version of fb)
// -> see answers to this SO question:
// https://stackoverflow.com/questions/50555275/react-native-objects-are-not-valid-as-a-react-child-found-object-with-keys
import firebase from '@firebase/app';
import '@firebase/auth';

class App extends Component {
    state = {
        loggedIn: false
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDiiAjpdPkryEXyFao1rNoFysM-f_Ondvg",
            authDomain: "rest-api-one.firebaseapp.com",
            databaseURL: "https://rest-api-one.firebaseio.com",
            projectId: "rest-api-one",
            // storageBucket: "rest-api-one.appspot.com",
            // messagingSenderId: "483867460155"
        });

        // Note: user is undefined if logged out!
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                <LoginForm />
            </View>
        );
    };
}

export default App;