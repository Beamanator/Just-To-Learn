import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { name: 'Max', age: 28 },
            { name: 'Bill', age: 65},
            { name: 'Steph', age: 33}
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

    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                { name: 'Jim', age: 28 },
                { name: event.target.value, age: 65},
                { name: 'Steph', age: 33}
            ]
        }) 
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
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return (
                            <Person
                                click={() => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age}>
                            </Person>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App!</h1>
                <p>This is working!</p>
                <button
                    style={style} 
                    onClick={this.togglePersonsHandler}
                >Toggle Persons</button>
                {persons}
            </div>
        );
    }
}

export default App;
