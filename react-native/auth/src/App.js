import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';
// import firebase from 'firebase';

class App extends Component {
    // NOTE: in udemy lecture, firebase init works with:
    // -> import firebase, then pass config into
    // -> firebase.initializeApp (inside componentWillMount)...
    // -> didn't work for me, so found this workaround which MAY work:
    // -> https://stackoverflow.com/questions/50555275/react-native-objects-are-not-valid-as-a-react-child-found-object-with-keys
    initializeFirebase() {
        const firebase = require('firebase');

        var config = {
            apiKey: "AIzaSyDiiAjpdPkryEXyFao1rNoFysM-f_Ondvg",
            authDomain: "rest-api-one.firebaseapp.com",
            databaseURL: "https://rest-api-one.firebaseio.com",
            projectId: "rest-api-one",
            storageBucket: "rest-api-one.appspot.com",
            messagingSenderId: "483867460155"
        };
        firebase.initializeApp(config);
    }

    componentWillMount() {
        // firebase.initializeApp({
        //     apiKey: "AIzaSyDiiAjpdPkryEXyFao1rNoFysM-f_Ondvg",
        //     authDomain: "rest-api-one.firebaseapp.com",
        //     databaseURL: "https://rest-api-one.firebaseio.com",
        //     projectId: "rest-api-one",
        //     storageBucket: "rest-api-one.appspot.com",
        //     messagingSenderId: "483867460155"
        // });
        this.initializeFirebase();
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