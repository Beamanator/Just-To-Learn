// import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// make a component
const Header = () => {
    const { textStyle, viewStyle } = styles;
    
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>Albums!</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8'
    },
    textStyle: {
        fontSize: 20
    }
};

// make the component available to other parts of app
export default Header;
