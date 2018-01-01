import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        // https://facebook.github.io/react-native/docs/panresponder.html
        const panResponder = PanResponder.create({
            // called any time screen is touched by user
            onStartShouldSetPanResponder: () => true,

            // called when user drags finger on screen
            onPanResponderMove: (event, gesture) => {
                // console.log(gesture);
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            // called when user releases finger on screen
            onPanResponderRelease: () => {}
        });

        this.state = { panResponder, position };
        // NOTE: in docs, panResponder gets assigned to state like above
        // HOWEVER, not necessary since panResponder rarely gets
        // updated with this.state.setState();
    }

    getCardStyle() {
        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate: '45deg' }]
        };
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            // add animation handlers to top card in deck ONLY
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return this.props.renderCard(item);
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck;