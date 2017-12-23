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

    // display containr (as grid)
    if (showNow || display === 'none') {
        $container.css('display', 'grid');
    }

    // hide popup if it is displayed
    else if (showNow === false || display === 'grid') {
        $container.css('display', 'none');
    }

    // throw error & hide if display is weird
    else {
        $container.css('display', 'none');
        Utils_ThrowError(`Loading popup should be grid or none, not <${display}>.`);
    }
}