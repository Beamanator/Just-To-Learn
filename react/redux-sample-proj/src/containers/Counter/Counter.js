import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAdd5ToCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtract5FromCounter}  />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li
                            key={strResult.id}
                            onClick={() => this.props.onDeleteResult(strResult.id)}
                        >
                            {strResult.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

// pretty common var name
const mapStateToProps = state => {
    return {
        ctr: state.counter,
        storedResults: state.results
    };
}

// similar to store.dispatch function
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAdd5ToCounter: () => dispatch({type: actionTypes.ADD, value: 5}),
        onSubtract5FromCounter: () => dispatch({type: actionTypes.SUBTRACT, value: 5}),
        onStoreResult: () => dispatch({type: actionTypes.STORE_RESULT}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);