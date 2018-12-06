// import basic features using .../app
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCR2FC8c3fJddRe_9276ugRtR6-UEM3XkI",
    authDomain: "marioplan-proj2.firebaseapp.com",
    databaseURL: "https://marioplan-proj2.firebaseio.com",
    projectId: "marioplan-proj2",
    storageBucket: "marioplan-proj2.appspot.com",
    messagingSenderId: "793184049853"
};
firebase.initializeApp(config);
// workaround for a specific firestore error
// https://github.com/angular/angularfire2/issues/1575
firebase.firestore().settings({
    timestampsInSnapshots: true
});

export default firebase;