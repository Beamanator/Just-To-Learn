import React from 'react';

import './UserOutput.css';

const useroutput = (props) => {
    let propsSize = Object.keys(props).length;

    // handle defaults
    if (!propsSize) props = {};
    if (!props.username) props.username = 'Unknown';

    return (
        <div className="UserOutput">
            <p>Welcome, {props.username}!</p>
            <p>Paragraph 2! Blank for now</p>
        </div>
    );
}

export default useroutput;