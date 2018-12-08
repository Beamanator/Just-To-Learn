import * as actionTypes from './actionTypes';

export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // add doc to firestore (store to database)
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('projects').add({
            ...project, // add title and content
            // hardcode everything for now
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
        }).then(() => {
            dispatch({
                type: actionTypes.CREATE_PROJECT,
                project
            });
        }).catch((err) => {
            dispatch({
                type: actionTypes.CREATE_PROJECT_ERROR,
                err
            });
        });
    }
}