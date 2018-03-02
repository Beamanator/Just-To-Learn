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
      ]
    }) 
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

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p>This is working!</p>
        <button onClick={this.switchNameHandler.bind(this, 'stephAY!')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'TEST')}
          changed={this.nameChangedHandler}
        >Hobbies: Skating</Person>
        <Person
          name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    );
  }
}

export default App;
