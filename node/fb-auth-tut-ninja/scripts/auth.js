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