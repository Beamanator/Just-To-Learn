import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import { Header } from './components/common';
import LibraryList from './components/LibraryList';

const store = createStore(reducers);

const App = () => {
    return (
        <Provider store={store}>
            {/* flex: 1 tells View to take up as much space as possible */}
            <View style={{ flex: 1 }}>
                <Header headerText="Tech Stack" />
                <LibraryList />
            </View>
        </Provider>
    );
};

export default App;