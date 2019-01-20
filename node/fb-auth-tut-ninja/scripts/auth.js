// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // get guide data from database
        db.collection('guides').get()
        .then(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    } else {
        // update UI with empty array of data
        setupGuides([]);
        setupUI();
    }
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