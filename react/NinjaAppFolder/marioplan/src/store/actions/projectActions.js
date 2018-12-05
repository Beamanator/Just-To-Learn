import * as actionTypes from './actionTypes';

export const createProject = (project) => {
    return (dispatch, getState) => {
        // TODO: some async stuff (store to database)
        dispatch({
            type: actionTypes.CREATE_PROJECT,
            project
        });
    }
}