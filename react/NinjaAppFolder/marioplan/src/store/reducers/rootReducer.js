import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    // automatically sync firestore and redux state
    firestore: firestoreReducer,
    // 'firebaseReducer' includes syncing auth status
    firebase: firebaseReducer,
});

export default rootReducer;