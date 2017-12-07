/**
 * Function is main handler for disc reserve features.
 * 
 * Called after /api/reserved?discType=...&uid=... route gets back with 
 * disc reserved status.
 * 
 * @param {object} config - holds reservation config
 */
function Reserve_HandleReserve(config) {
    // get data from config
    let reservedStatus = config.reservedStatus;
    let discType = config.discType;

    // get jQuery elems
    let $discNotAvailableMsg = $('.reserve-disc-not-available-warning'),
        $contactDetailsEmptyMsg = $('.contact-details-empty-warning');

    let $contactDetails = $('.modal-body .contact-details');

    // only a 'not reserved' status should allow the user to reserve discs
    if (reservedStatus.status === 'not reserved') {

        // display contact details
        $contactDetails.css('display', 'grid');

        // fields are filled out, allow reservation
        if ( Utils_CheckContactDetailsFilled() ) {
            Reserve_EnableReserve();
            Reserve_AddReserveListener(discType);
        }

        // if any fields are not filled out, don't allow reservation & show warning
        else {
            Reserve_DisableReserve($contactDetailsEmptyMsg);
        }
    }
    
    // otherwise (status could be 'error' or 'reserved') -> disable button
    else {
        Reserve_DisableReserve($discNotAvailableMsg);
    }
}

/**
 * Function adds click listener to "Reserve" button, and sends reservation
 * details to server
 * 
 * TODO: Make some kind of "reserved!" message, & what to do next
 * 
 * @param {string} discType - type of disc being reserved
 */
function Reserve_AddReserveListener(discType) {
    $reserveBtn = getReserveButton();

    // When the user clicks on the "Reserve" button (one-time)
    $reserveBtn.one('click', function(e_click) {
        // disable reserve button
        $reserveBtn.prop('disabled', true);

        // get contact details
        let contactDetails = Utils_GetContactDetails();

        // get user details
        let user = Auth_getUser();
        let uid = user.uid,
            email = user.email;

        // reserve disc by calling node route!
        $.ajax({
            type: 'POST',
            url: '/shop/reserve/' + discType,
            data: {
                uid: uid,

                // details of reservation
                reserveDetails: {
                    // timestamp: -> calculated in node
                    firstName: contactDetails.firstName,
                    lastName: contactDetails.lastName,
                    phoneNumber: contactDetails.phoneNumber,
                    email: email,
                    discType: discType
                }
            }
        })
        .then(function(data) {
            console.info('msg:', data.msg);
        })
        .catch(Utils_ThrowError);
    });
}

/**
 * Function displays only passed-in warning to explain why reservation can't happen.
 * - Also disables reserve button
 * 
 * @param {object} $warningElem - jQuery warning element to be displayed
 */
function Reserve_DisableReserve($warningElem) {
    // hide all warnings except warning elem
    Reserve_DisplayWarning($warningElem);

    // disable reserve button
    getReserveButton().prop('disabled', true);
}

function Reserve_DisplayWarning($warningElem) {
    // hide all warnings
    getReserveWarningHolder()
    .children('span').css('display','none');

    // don't try to show elem if undefined
    if (!$warningElem) return;

    // show passed-in warning
    $warningElem.css('display','inline');
}

/**
 * Function hides all reservation warnings and enables reservation button
 * 
 */
function Reserve_EnableReserve() {
    // hide all warnings
    Reserve_DisplayWarning();

    // enable reserve button
    getReserveButton().prop('disabled', false);
}

// =========================== local functions =============================

function getReserveButton() {
    return $('.modal-footer-reserve button');
}
function getReserveWarningHolder() {
    return $('.modal-footer-message');
}