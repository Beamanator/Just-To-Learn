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
    const WithClass2 = class extends Component {
        render() {
            // Note: ref is a reserved prop and does not easily get passed
            // to wrapped component, like other props
            return (
                <div className={className}>
                    <WrappedComponent
                        ref={this.props.forwardedRef}
                        {...this.props}
                    />
                </div>
            )
        }
    }

    // use this if you want to pass 'ref' props from parent to wrapped
    // child Component, but don't want to rename the 'ref' prop on the
    // parent, so instead you pass `ref` through an intermediate prop
    // called 'forwardedRef' in this function
    return React.forwardRef((props, ref) => {
        return <WithClass2 {...props} forwardedRef={ref} />
    })
}

export default withClass2;