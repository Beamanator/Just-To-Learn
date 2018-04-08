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