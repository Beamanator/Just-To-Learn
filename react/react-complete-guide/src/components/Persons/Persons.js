import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
    return (
        props.persons.map( (person, index) => (
            <Person
                click={() => props.clicked(index)}
                name={person.name}
                key={person.id}
                age={person.age}
                changed={(event) => props.changed(event, person.id)}>
            </Person>
        ))
    );
}

export default persons;