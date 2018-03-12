import React from 'react';

import './Char.css';

const char = (props) => {
    const letter = props.letter;

    return (
        <div className="Char"
            onClick={props.click}
        >
            {letter}
        </div>
    );
}

export default char;