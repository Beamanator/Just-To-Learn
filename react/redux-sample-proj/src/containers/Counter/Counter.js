import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

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
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
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
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
}

// similar to store.dispatch function
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch( actionCreators.increment() ),
        onDecrementCounter: () => dispatch( actionCreators.decrement() ),
        onAdd5ToCounter: () => dispatch( actionCreators.add(5) ),
        onSubtract5FromCounter: () => dispatch( actionCreators.subtract(5) ),
        onStoreResult: (result) => dispatch( actionCreators.storeResult(result) ),
        onDeleteResult: (id) => dispatch( actionCreators.deleteResult(id) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);