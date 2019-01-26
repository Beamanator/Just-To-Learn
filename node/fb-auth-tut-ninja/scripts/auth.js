let guidesUnsubscribe = null;

// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    // invoke the firebase function, passing in data :)
    addAdminRole({ email: adminEmail })
    .then(result => {
        console.log(result);
    })
})

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // get guide data from database
        guidesUnsubscribe = db.collection('guides')
        // onSnapshot does initial document get PLUS sets up listener
        // -> to run any time the database is updated
        .onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    } else {
        // update UI with empty array of data
        setupGuides([]);
        setupUI();
        // unsubscribe from 'guides' collection listener
        if (guidesUnsubscribe) guidesUnsubscribe();
    }
});

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent refresh

    db.collection('guides').add({
        // remember, can still use e.target['...id'] or e.target.<id> or createForm.<id>
        title: createForm['title'].value,
        content: createForm['content'].value,
    })
    .then(() => {
        // clear form & close modal
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close(); // close modal
        createForm.reset();
    })
    .catch(err => {
        console.error(err.message);
    })
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent refresh (which would close modal)

    // get user info
    // NOTE: can also do e.target['signup-email'], ...
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
        // don't use .add cuz that automatically makes a document
        // -> with an auto-generated id!
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
        });
    })
    .then(() => {
        // get signup modal & close & clear form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close(); // close modal
        signupForm.reset(); // clear text from form
    })
});

// logout
const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault(); // prevent... something
    auth.signOut() // sign out current user
    // .then() -> handled in onAuthStateChanged
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent refresh (which would close modal)

    // get user info
    // NOTE: can also do loginForm['login-email']...
    const email = e.target['login-email'].value;
    const password = e.target['login-password'].value;

    // login user
    auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
        // get login modal & close & clear form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close(); // close modal
        loginForm.reset(); // clear text from form
    })
});