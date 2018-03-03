import React from 'react';

const userinput = (props) => {
    this.inputStyles = {
        backgroundColor: 'cyan',
        width: '25%',
        height: '50px',
        fontSize: '2em'

    }

    return (
        <div>
            <input
                onChange={props.change}
                value={props.value}
                style={this.inputStyles}
            />
        </div>
    );
}

export default userinput;