import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    names: [
      {username: 'Bob'},
      {username: 'Jimmy'}
    ]
  }

  nameChangeHandler = (event) => {
    // can't do this - have to do setState! :(
    // this.state.names[0].username = event.target.value;
    let names = event.target.value.split(',');
    
    // handle 1 name
    if (names.length == 1) names.push('Other name');
    if (names[1].length == 0) names[1] = 'Other name';

    this.setState({
      names: [
        {username: names[0]},
        {username: names[1]}
      ]
    });
  }

  render() {
    this.allNames = this.state.names.map(name => name.username).join(',');

    return (
      <div className="App">
        <UserInput
          change={this.nameChangeHandler}
          value={this.allNames}
        />
        <UserOutput username={this.state.names[0].username} />
        <UserOutput username={this.state.names[1].username}/>
      </div>
    );
  }
}

export default App;
