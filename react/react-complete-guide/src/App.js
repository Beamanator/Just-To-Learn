import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: 'awoi3nfa', name: 'Max', age: 28 },
            { id: 'anfaonoi', name: 'Bill', age: 65},
            { id: 'opina982', name: 'Steph', age: 33}
        ]
    }

    switchNameHandler = (newName) => {
        // DON'T USE THIS
        // this.state.persons[0].name = "WOAH";
    
        // instead, do this:
        this.setState({
            persons: [
                { name: newName, age: 28 },
                { name: 'BILLY', age: 65},
                { name: 'Steph', age: 33}
            ],
            otherState: 'other state value',
            showPersons: false
        });
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    }

    deletePersonHandler = (personIndex) => {
        // recommended to not directly edit the original array, but create
        //  a new array and edit it. Here are two options:
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];

        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;

        // flips the doesShow flag
        this.setState({showPersons: !doesShow});
    }

    render() {
        // name is up to me
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            // available with Radium pkg:
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => (
                        <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}>
                        </Person>
                    ))}
                </div>
            );

            style.backgroundColor = 'red';
            style[':hover'] = {
                backgroundColor: 'salmon',
                color: 'black'
            }
        }

        // array of class names defined in App.css
        const classes = [];
        if (this.state.persons.length <= 2) classes.push('red');
        if (this.state.persons.length <= 1) classes.push('bold');

        return (
            <div className="App">
                <h1>Hi, I'm a React App!</h1>
                <p className={classes.join(' ')}>This is working!</p>
                <button
                    style={style} 
                    onClick={this.togglePersonsHandler}
                >Toggle Persons</button>
                {persons}
            </div>
        );
    }
}

export default Radium(App);
