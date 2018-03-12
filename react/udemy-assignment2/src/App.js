import React, { Component } from 'react';
import './App.css';

import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
    state = {
        text: 'begin'
    }

    /**
     * Function handles text edit event - stores new value
     * to state
     * 
     * @memberof App
     */
    editTextHandler = (event) => {
        const newText = event.target.value;

        this.setState({
            text: newText
        });
    }

    /**
     * Function deletes a letter at specified [index] from state's
     * .text prop
     * 
     * @memberof App
     */
    deleteLetterHandler = (index) => {
        const newText = this.state.text.split('');
        newText.splice(index, 1);

        this.setState({
            text: newText.join('')
        })
    }

    /**
     * Function creates and returns JSX
     * 
     * @returns JSX to render
     * @memberof App
     */
    render() {
        const text = this.state.text;

        const textLength = text.length;
        const letterArr = text.split('').map((elem, i) => {
            return (
                <Char
                    key={'' + i + elem.charCodeAt(0)}
                    letter={elem}
                    click={(event) => this.deleteLetterHandler(i)}
                />
            );
        })

        return (
            <div className="App">
                <input onChange={this.editTextHandler}
                    value={text}/>
                <p id="textLengthOutput">Text Length: {textLength}</p>
                <Validation textLength={textLength}/>
                <div>
                    {letterArr}
                </div>
            </div>
        );
    }
}

export default App;
