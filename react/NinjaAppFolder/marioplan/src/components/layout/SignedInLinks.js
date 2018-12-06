import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to="/create">New Project</NavLink></li>
            <li><a href="#" onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to="/"
                className='btn btn-floating pink lighten-1'
            >NN</NavLink></li>
        </ul>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(actions.signOut()),
    }
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(SignedInLinks);