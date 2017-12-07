/**
 * Purpose: handle all Auth functions here :)
 */
$(document).ready(function() {
    // initial Auth setup (after page loads)
    Auth_setupStateChangeListener();

});

// =============== functions called from JS ====================

/**
 * Function gets user object from firebase - any time, anywhere.
 * 
 */
function Auth_getUser() {
    return firebase.auth().currentUser;
}
function Auth_getUserID() {
    let user = Auth_getUser();

    if (user) return user.uid;
    else return '';
}

/**
 * Function sets up login / logout state change listener
 * 
 */
function Auth_setupStateChangeListener() {
    // Get the currently signed-in user
    // The recommended way to get the current user is by setting an observer on the
    //   Auth object:
    firebase.auth().onAuthStateChanged(function(user) {
        // get div references
        let $in = $('div.user-login'),
            $out = $('div.user-logout'),
            $welcome = $('div.welcome-message'),
            $reserve = $('.modal-footer-reserve button'),
            $reserveSigninWarning = $('.reserve-signin-warning'),
            $contactDetailGrid = $('.modal-body .contact-details');

        // user login:
        if (user) {
            console.info('sign in');

            // store user data to fb database
            let uid = user.uid;
            $.ajax({
                method: "POST",
                url: "/auth/login",
                data: {     uid: uid        }
            })
            .then(function(res) { console.info('user login:', res.msg); })
            .catch(function(err) {      console.error(err);     });

            // show / hide login / logout buttons
            $in.addClass('hide-div');
            $out.removeClass('hide-div');

            // add welcome message (up to 25 characters of name)
            $welcome.text(`Welcome, ${
                user.displayName.length > 20 ? user.displayName.substr(0,20) + '...' : user.displayName
            }.`);

            // enable disc reserve button
            Reserve_EnableReserve();

            // display contact detail grid
            $contactDetailGrid.css('display','grid');

            // get user contact info from db, put in modal
            Main_SetUserContactInfo(uid);
        }
        
        // user logout:
        else {
            console.info('sign out');

            // show / hide login / logout buttons
            $in.removeClass('hide-div');
            $out.addClass('hide-div');

            // add welcome message
            $welcome.text('Please sign in :)');

            // disable disc reserve button
            Reserve_DisableReserve($reserveSigninWarning);

            // hide contact detail grid
            $contactDetailGrid.css('display','none');
        }
    });
}

// ================ Functions called from HTML ==================

/**
 * Function signs user out of app
 * 
 */
function Auth_signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful. - maybe change view?
    }).catch(function(error) {
        // An error happened. - maybe show error page?
    });
}

/**
 * Function allows user to sign in via popup
 * 
 */
function Auth_signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();

    // try to sign user in via Google with popup
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // TODO: do something with the user info
        // TODO: maybe send to server?
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // TODO: do something else with errors?
        console.error(error);
    });
}