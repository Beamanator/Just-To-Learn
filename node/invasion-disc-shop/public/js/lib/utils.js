/**
 * Function throws console error with passed-in message
 * 
 * @param {any} message - can be any data type, this is passed directly to console
 */
function Utils_ThrowError(message) {
    console.error(message);

    // hide loading popup, just in case
    Utils_ToggleLoadingIcon(false);
}

/**
 * Function checks if contact fields are populated
 * 
 * @returns {boolean} - true / false if all fields are populated or not
 */
function Utils_CheckContactDetailsFilled() {
    let contactDetails = Utils_GetContactDetails();

    let fName = contactDetails.firstName,
        lName = contactDetails.lastName,
        phone = contactDetails.phoneNumber;

    return fName.length > 0 && lName.length > 0 && phone.length > 0;
}

/**
 * Function gets contact details from elements using jQuery
 * 
 * @returns {object} - contact details container object
 */
function Utils_GetContactDetails() {
    let $contactDetailsElem = $('.modal-body .contact-details');
    
    let contactObj = {
        firstName: $contactDetailsElem.find('.first-name').val().trim(),
        lastName: $contactDetailsElem.find('.last-name').val().trim(),
        phoneNumber: $contactDetailsElem.find('.phone-number').val().trim()
    };

    return contactObj;
}

/**
 * Functions (...NeedsSave and ...Saved) update the css of contact update button.
 * 
 * When needs save, color border & text red. When saved, color back to black
 * 
 * @param {object} $elem - jQuery element holding contact button
 */
function Utils_ContactNeedsSaveUpdateCSS($elem) {
    if (!$elem || $elem.length === 0)
        $elem = $('.contact-update-button button');

    $elem.css({
        'color': 'red',
        'border-color': 'red'
    });
}
function Utils_ContactSavedUpdateCSS($elem) {
    if (!$elem || $elem.length === 0)
        $elem = $('.contact-update-button button');

    $elem.css({
        'color': 'black',
        'border-color': 'black'
    });
}

/**
 * Function returns a random number in range of params
 * Note: from is inclusive, to is exclusive
 * Example: from 0 to 3 returns either: 0, 1, or 2. 
 * 
 * @param {number} from - inclusive
 * @param {number} to - exclusive
 * @returns - random number or error message
 */
function Utils_GetRandomInRange(from, to) {
    if (typeof(from) !== 'number') return '"from" param invalid';
    if (typeof(to) !== 'number') return '"to" param invalid';

    return from + Math.floor(Math.random() * to);
}

/**
 * Function displays loading container, or hides conatiner - depending on
 * current status of css 'display' attribute
 * 
 * @param {boolean} showNow - true =show elem now. False = hide now.
 */
function Utils_ToggleLoadingIcon( showNow ) {
    let $container = $('.loading-container');
    let display = $container.css('display');

    // hide popup if it is displayed
    if (showNow === false || display === 'grid') {
        $container.css('display', 'none');
    }

    // display containr (as grid)
    else if (showNow || display === 'none') {
        $container.css('display', 'grid');
    }

    // throw error & hide if display is weird
    else {
        $container.css('display', 'none');
        Utils_ThrowError(`Loading popup should be grid or none, not <${display}>.`);
    }
}

/**
 * Function gets number of discs user has reserved, and updates a span in the 
 * grid-1-nav with that number.
 * 
 * @param {string} uid - user id
 */
function Utils_UpdateNumReservedDiscs(uid) {
    let $myReservations = $('.grid-1-nav #my-reservations-count');
    let text = 'My Reservations ';

    Utils_GetNumReservedDiscs(uid)
    .then(function(count) {
        // set count in span text :)
        $myReservations.text(count);
    })
    .catch(Utils_ThrowError);
}

/**
 * Function calls api to get number of reserved discs, for specified uid
 * 
 * @param {any} uid - see above
 * @returns 
 */
function Utils_GetNumReservedDiscs(uid) {
    return new Promise( (resolve, reject) => {
        // call api to get # of reserved discs by uid
        $.ajax({
            method: 'GET',
            url: '/api/reserved/number/' + uid
        })
        .then(function(data) {
            let count = data.count;

            if (count == undefined || count == null) count = 0;

            // do something before returning?
            resolve(count);
        })
        .catch(Utils_ThrowError);
    });
}

/**
 * Function redirects user to page, based on passed-in slug
 * 
 * @param {string} slug - slug of page user needs to be redirected to
 */
function Utils_Redirect(slug) {
    let currentPath = Utils_GetPagePath();

    switch(slug.toUpperCase()) {
        case 'CART':
            let uid = Auth_GetUserID();

            if (currentPath === '/cart') {
                // don't do anything - already on cart page
                console.log('already on cart page');
            }

            // if user is logged in && not currently on cart page, redirect to cart
            else if (uid) {
                $(location).attr('href','/cart?uid=' + uid);
            }

            // else, stay here & throw error
            else {
                let err = 'You must log in to see your cart.';
                Utils_ThrowError(err);

                // also update welcome message
                Utils_UpdateWelcomeMessage(err);
            }
            break;

        case 'SHOP':
            if (currentPath === '/shop') {
                // don't do anything - already on shop page
                console.log('already on shop page');
            }

            // redirect to shop page
            else {
                $(location).attr('href', '/shop');
            }
            break;

        default:
            let err = `Redirect slug unknown: <${slug}>`;
            Utils_ThrowError(err);
            return;
    }
}

/**
 * Function gets current page path (using jQuery) and returns it.
 * 
 * @returns current page's path [as string]
 */
function Utils_GetPagePath() {
	return $(location).attr('pathname');
}

/**
 * Function updates text in welcome message
 * 
 * @param {string} message - any message to display in welcome area
 */
function Utils_UpdateWelcomeMessage(message) {
    // throw error if no welcome message passed
    if (!message) {
        let err = 'No welcome message passed in.';
        Utils_ThrowError(err);
    }

    else {
        let $welcome = $('div.welcome-message');
        $welcome.text(message);
    }
}