/**
 * Function throws console error with passed-in message
 * 
 * @param {any} message - can be any data type, this is passed directly to console
 */
function Utils_ThrowError(message) {
    console.error(message);
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