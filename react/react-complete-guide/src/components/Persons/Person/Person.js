import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
// import WithClass from '../../../hoc/WithClass';
import withClass2 from '../../../hoc/withClass2';
import Auxiliary from '../../../hoc/Auxiliary';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props);
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
    }

    render() {
        console.log('[Person.js] Inside render()');
        return (
            <Auxiliary>
                <p onClick={this.props.click} >I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Auxiliary>
        )
        // this is technically an option with React 16, but won't look
        //  nice b/c styling was set on the wrapping <div> element
        // return [
        //     <p key="1" onClick={this.props.click} >I'm {this.props.name} and I am {this.props.age} years old!</p>
        //     <p key="2">{this.props.children}</p>
        //     <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />
        // ]
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass2(Person, classes.Person);