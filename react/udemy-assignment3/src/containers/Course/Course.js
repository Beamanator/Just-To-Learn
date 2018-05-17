import React, { Component } from 'react';

class Course extends Component {
    render () {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>You selected the Course with ID: _ID_</p>
            </div>
        );
    }
}

export default Course;