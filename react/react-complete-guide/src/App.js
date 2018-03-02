import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    // using JSX
    // return (
    //   <div className="App">
    //     <h1>Hi, I'm a React App!</h1>
    //   </div>
    // );

    // using React library (JSX gets compiled into this)
    // can render normal html element, or another custom component
    return React.createElement('div',
      {
        className: 'App'
      }, 
      React.createElement('h1', null,'Hi, I\'m a React App!!!')
    );
  }
}

export default App;
