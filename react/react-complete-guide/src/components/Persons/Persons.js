import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside Constructor', props);
    }

    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
        // if a different component updates and triggers this function,
        //  the following return statement will prevent render from calling
        //  here and hence save some performance
        return nextProps.persons !== this.props.persons;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate');
    }

    render() {
        console.log('[Persons.js] Inside render()');
        
        return (
            this.props.persons.map( (person, index) => (
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    key={person.id}
                    age={person.age}
                    changed={(event) => this.props.changed(event, person.id)}>
                </Person>
            ))
        );
    }
}

export default Persons;