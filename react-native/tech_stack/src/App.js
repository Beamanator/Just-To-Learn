import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import { Header } from './components/common';

const store = createStore(reducers);

const App = () => {
    return (
        <Provider store={store}>
            <View>
                <Header headerText="Tech Stack" />
            </View>
        </Provider>
    );
};

export default App;