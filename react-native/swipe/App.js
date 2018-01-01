import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Ball from './src/Ball';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
    { id: 1, text: 'Card #1', uri: 'http://via.placeholder.com/100x100' },
    { id: 2, text: 'Card #2', uri: 'http://via.placeholder.com/100x100' },
    { id: 3, text: 'Card #3', uri: 'http://via.placeholder.com/100x100' },
    { id: 4, text: 'Card #4', uri: 'http://via.placeholder.com/100x100' },
    { id: 5, text: 'Card #5', uri: 'http://via.placeholder.com/100x100' },
    { id: 6, text: 'Card #6', uri: 'http://via.placeholder.com/100x100' },
    { id: 7, text: 'Card #7', uri: 'http://via.placeholder.com/100x100' },
    { id: 8, text: 'Card #8', uri: 'http://via.placeholder.com/100x100' }
];

export default class App extends Component {
    // Function called one time per object in DATA array
    renderCard(item) {
        return (
            <Card
                key={item.id}
                title={item.text}
                image={{ uri: item.uri }}
            >
                <Text style={{ marginBottom: 10 }}>
                    I can customize the Card further.
                </Text>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor="#03A9F4"
                    title="View Now!"
                />
            </Card>

            // <Text>{item.text}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Deck
                    data={DATA}
                    renderCard={this.renderCard}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
