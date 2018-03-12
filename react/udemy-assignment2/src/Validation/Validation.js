import React from 'react';

const validation = (props) => {
    const textLength = props.textLength;
    
    // create message depending on how long textLength is!
    const textLongEnough = 'Text long enough.';
    const textTooShort = 'Text too short.';

    // return output JSX
    return (
        <div>
            <p>{textLength > 5 ? textLongEnough : textTooShort}</p>
        </div>
    );
}

export default validation;