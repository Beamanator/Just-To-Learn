// Note: all of this code will be running on firebase server
// -> NOT in the browser
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// after initializing the admin app, we can use
// -> the firebase admin sdk moving forward :)
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello, ninjas!");
});

const createNotification = (notification) => {
    return admin.firestore()
        .collection('notifications')
        .add(notification)
        .then((document) => {
            // console.log('notification added', document);
        })
}

// set up firestore trigger to react when
// -> a project document is created
exports.projectCreated = functions.firestore
    .document('/projects/{projectId}')
    .onCreate((doc) => {
        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp(),
        };

        return createNotification(notification);
    });

// set up auth trigger to react when
// -> a new user is created
exports.userJoined = functions.auth.user()
    .onCreate((user) => {
        return admin.firestore().collection('users')
            .doc(user.uid)
            // get user document from firestore
            .get().then((document) => {
                const newUser = document.data();
                const notification = {
                    content: 'Joined the party',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp(),
                };

                return createNotification(notification);
            });
    });