import React from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
    // array of class names defined in App.css
    const assignedClasses = [];
    
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2) assignedClasses.push( classes.red );
    if (props.persons.length <= 1) assignedClasses.push( classes.bold );
    

    return (
        <div className={classes.Cockpit}>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>This is working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}
            >Toggle Persons</button>
        </div>
    );
}

export default cockpit;