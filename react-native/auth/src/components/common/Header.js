// import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// make a component
const Header = ({ headerText }) => {
    const { textStyle, viewStyle } = styles;
    
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,

        // shadows:
        // android:
        elevation: 5, // (also must have backgroundColor)
        // ios:
        // shadowColor: '#ccc', // black
        // shadowOffset: { width: 0, height: 20 },
        // shadowOpacity: 0.2

        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};

// make the component available to other parts of app
export { Header };
