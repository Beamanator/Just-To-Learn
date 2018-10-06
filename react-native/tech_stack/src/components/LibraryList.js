import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class LibraryList extends Component {
    renderItem(libraryContainer) {
        // NOTE: In lecture, we didn't have to pull out 'item' prop
        // -> here. Maybe it's a recent change
        return <ListItem library={libraryContainer.item} />;
    }
    
    render() {
        const { libraries } = this.props;
        console.log(libraries);
        return (
            <FlatList
                data={libraries}
                renderItem={this.renderItem}
                keyExtractor={(library) => '' + library.id}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        libraries: state.libraries
    };
};

export default connect(mapStateToProps)(LibraryList);