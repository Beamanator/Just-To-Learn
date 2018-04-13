import React, {Component} from 'react';

// normal js function
// const withClass2 = (WrappedComponent, className) => {
//     // returns functional component
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     );
// }

const withClass2 = (WrappedComponent, className) => {
    // returns stateful component
    return class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
}

export default withClass2;