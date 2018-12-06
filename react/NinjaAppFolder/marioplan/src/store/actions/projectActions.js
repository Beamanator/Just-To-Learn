import * as actionTypes from './actionTypes';

export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // add doc to firestore (store to database)
        const firestore = getFirestore();

        firestore.collection('projects').add({
            ...project, // add title and content
            // hardcode everything for now
            authorFirstName: 'Al',
            authorLastName: 'Beaman',
            authorId: 12345,
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