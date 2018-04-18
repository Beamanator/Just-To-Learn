import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside Constructor', props);
        this.lastPersonRef = React.createRef();
    }

    componentWillMount() {
        // Note: usage of this function is discouraged as of React 16.3
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
        // Note: usage of this function is discouraged as of React 16.3
        console.log(
            '[UPDATE Persons.js] Inside componentWillReceiveProps',
            nextProps
        );
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     // if a different component updates and triggers this function,
    //     //  the following return statement will prevent render from calling
    //     //  here and hence save some performance
    //     return nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked;
    //     // return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        // Note: usage of this function is discouraged as of React 16.3
        console.log(
            '[UPDATE Persons.js] Inside componentWillUpdate',
            nextProps,
            nextState
        );
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate');
    }

    render() {
        console.log('[Persons.js] Inside render()');
        
        return (
            this.props.persons.map( (person, index) => (
                <Person
                    click={() => this.props.clicked( index )}
                    name={person.name}
                    position={index}
                    key={person.id}
                    ref={this.lastPersonRef}
                    age={person.age}
                    changed={(event) => this.props.changed(event, person.id)}>
                </Person>
            ))
        );
    }
}

export default Persons;