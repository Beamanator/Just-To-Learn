import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside Constructor', props);
        this.state = {
            persons: [
                { id: 'awoi3nfa', name: 'Max', age: 28 },
                { id: 'anfaonoi', name: 'Bill', age: 65},
                { id: 'opina982', name: 'Steph', age: 33}
            ],
            otherState: 'some other value',
            showPersons: false,
            toggleClicked: 0
        }
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     // if a different component updates and triggers this function,
    //     //  the following return statement will prevent render from calling
    //     //  here and hence save some performance
    //     return nextState.persons !== this.state.persons ||
    //         nextState.showPersons !== this.state.showPersons;
    //     // return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate');
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
        this.setState( (prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    }

    render() {
        console.log('[App.js] Inside render()');
        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler} 
                /> 
            );
        }

        return (
            <WithClass classes={classes.App}>
                <button
                    onClick={() => {this.setState({showPersons: true})}}
                >Show Persons</button>
                <Cockpit
                    appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}
                />
                {persons}
            </WithClass>
        );
    }
}

export default App;
