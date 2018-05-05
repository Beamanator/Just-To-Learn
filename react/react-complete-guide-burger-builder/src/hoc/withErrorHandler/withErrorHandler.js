import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        // can be used b/c we're not causing side-effects, just
        // setting up interceptors
        componentWillMount() {
            // clear all errors on request
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });
            // only use error handler from axios
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });
        }

        // executed at the point in time when a component isn't
        // required anymore. EX: when a page (BurgerBuilder.js) is changed,
        // this component is not needed anymore so the interceptors can be
        // removed / ejected
        componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            // prevent memory leaks
            axios.interceptors.request.eject(
                this.reqInterceptor
            );
            axios.interceptors.request.eject(
                this.resInterceptor
            );
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {

            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        };
    }
}

export default withErrorHandler;