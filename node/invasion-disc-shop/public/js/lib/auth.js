/**
 * Purpose: handle all Auth functions here :)
 */

// =============== functions called from JS ====================

/**
 * Function gets user object from firebase - any time, anywhere.
 * 
 */
function Auth_GetUser() {
    return firebase.auth().currentUser;
}
function Auth_GetUserID() {
    let user = Auth_GetUser();

    if (user) return user.uid;
    else return '';
}

/**
 * Function sets up login / logout state change listener
 * Available config options - see getLoginStateConfigWithDefaults function
 * 
 * @param {object} config - props define functionality for login/logout
 * 
 */
function Auth_SetupStateChangeListener(config) {
    // setup config with default vals, if not passed in
    config = getLoginStateConfigWithDefaults(config);
    
    // The recommended way to get the current user is by setting an observer on the
    //   Auth object:
    firebase.auth().onAuthStateChanged(function(user) {
        // get div references
        let $in = $('div.user-login'),
            $out = $('div.user-logout'),
            $reserve = $('.modal-footer-reserve button'),
            $reserveSigninWarning = $('.reserve-signin-warning'),
            $contactDetailGrid = $('.modal-body .contact-details');

        // user login:
        if (user) {
            console.info('sign in');
            let uid = user.uid;

            // store user data to fb database
            if (config.incrementLoginCount) {
                $.ajax({
                    method: "POST",
                    url: "/auth/login",
                    data: {     uid: uid        }
                })
                .then(function(res) { console.info('user login:', res.msg); })
                .catch(Utils_ThrowError);
            }

            // show / hide login / logout buttons
            $in.addClass('hide-div');
            $out.removeClass('hide-div');

            // add welcome message (up to 25 characters of name)
            Utils_UpdateWelcomeMessage(
                `Welcome, ${user.displayName.length > 20 ?
                    user.displayName.substr(0,20) + '...' : user.displayName
                }.`
            );

            // update display - # of discs reserved
            Utils_UpdateNumReservedDiscs();

            // for page(s) with disc detail modal
            if (config.hasDiscDetailModal) {
                // display contact detail grid
                $contactDetailGrid.css('display','grid');

                // enable disc reserve button
                Reserve_EnableReserve();

                // get user contact info from db, put in disc-detail modal
                Main_SetUserContactInfo(uid);
            }
        }
        
        // user logout:
        else {
            console.info('sign out');

            if (config.redirectOnLogout) {
                // redirect to shop page
                $(location).attr('href', '/shop');
            }

            // show / hide login / logout buttons
            $in.removeClass('hide-div');
            $out.addClass('hide-div');

            // add welcome message
            Utils_UpdateWelcomeMessage('Please sign in :)');

            // disable disc reserve button
            Reserve_DisableReserve($reserveSigninWarning);

            // update display - # of discs reserved (0 - not logged in)
            Utils_UpdateNumReservedDiscs();

            // for page(s) with disc detail modal
            if (config.hasDiscDetailModal) {    
                // hide contact detail grid
                $contactDetailGrid.css('display','none');
            }
        }
    });
}

// ================ Functions called from HTML ==================

/**
 * Function signs user out of app
 * 
 */
function Auth_SignOut() {
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
function Auth_SignIn() {
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

// ============================ internal functions =============================
/**
 * Available config options
 * - <key:default> - description
 * - <incrementLoginCount:false> - increment user login count in db
 * 
 * @param {object} config - config for login / logout action
 * @returns - config key with defaults (if needed)
 */
function getLoginStateConfigWithDefaults(config) {
    let defaults = {
        incrementLoginCount: false,
        hasDiscDetailModal: false,
        redirectOnLogout: false
    };

    // loop through defaults, adding defaults to config if needed
    Object.keys(defaults).forEach(function(key, index) {

        // if key in config undefined, set default
        if (config[key] === undefined ) {
            config[key] = defaults[key];
        }

        // else {} -> config is populated, so use that as priority
    });
    
    return config;
}