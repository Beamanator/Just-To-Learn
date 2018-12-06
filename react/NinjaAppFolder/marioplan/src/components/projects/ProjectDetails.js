import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

function ProjectDetails(props) {
    // get id from url
    const {
        project, auth
    } = props;

    if (!auth.uid) return <Redirect to="/signin" />;
    
    return project ? (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <div className="card-title">{project.title}</div>
                    <p>{project.content}</p>
                </div>

                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                    <div>3rd November, 2am (fixme)</div>
                </div>
            </div>
        </div>
    ) : (
        <div className="container center">
            <p>Loading project...</p>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    return {
        project: projects ? projects[id] : null,
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);
