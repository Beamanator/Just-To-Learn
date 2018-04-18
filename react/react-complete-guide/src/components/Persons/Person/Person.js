import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
// import WithClass from '../../../hoc/WithClass';
import withClass2 from '../../../hoc/withClass2';
import Auxiliary from '../../../hoc/Auxiliary';

import { AuthContext } from '../../../containers/App';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props);
        this.inputElementRef = React.createRef();
    }

    componentWillMount() {
        // Note: usage of this function is discouraged as of React 16.3
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        if (this.props.position === 0) {
            this.inputElementRef.current.focus();
        }
    }

    focus() {
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] Inside render()');
        return (
            <Auxiliary>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated!</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
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