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

  switchNameHandler = () => {
    // DON'T USE THIS
    // this.state.persons[0].name = "WOAH";
    
    // instead, do this:
    this.setState({
      persons: [
        { name: 'JIMMAYY', age: 28 },
        { name: 'Bill', age: 65},
        { name: 'Steph', age: 33}
      ]
    }) 
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App!</h1>
        <p>This is working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age="28"/>
        <Person name="Bill" age="65">Hobbies: Skating</Person>
        <Person name="Steph" age="34"/>
      </div>
    );
  }
}

export default App;
