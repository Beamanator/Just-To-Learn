/**
 * Function is main handler for disc reserve features.
 * 
 * Called after disc clicked & /api/reserved-status?discType=...&uid=... route
 * gets back with disc reserved status.
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
    
    // status is 'reserved' -> disable 'reserve' and enable 'delete reservation'
    else if (reservedStatus.status === 'reserved') {
        Reserve_DisableReserve($discNotAvailableMsg);

        Reserve_AddCancelReserveListener(discType);
        Reserve_DisplayCancelReserveButton();
    }

    // otherwise (status could be 'error') -> disable button
    else {
        Reserve_DisableReserve($discNotAvailableMsg);
    }
}

/**
 * See other function (Reserve_AddReserveListener) - basically the same thing
 * 
 * @param {string} discType - see Reserve_AddReserveListener
 */
function Reserve_AddCancelReserveListener(discType) {
    let $cancelReserveBtn;

    // get btn & unbind previously bound click events
    if (Utils_isPage('/shop')) {
        $cancelReserveBtn = getCancelReserveButton().unbind('click');
    } else if (Utils_isPage('/cart')) {
        $cancelReserveBtn = getCancelReserveButton(discType).unbind('click');
    }

    // When the user clicks on the "Cancel Reservation" button (one-time)
    $cancelReserveBtn.bind('click', function(e_click) {
        $this = $(this);

        // show loading popup
        Utils_ToggleLoadingIcon(true);

        // unbind click event immediately
        $(this).unbind('click');

        // disable cancel reserve button immediately
        if (Utils_isPage('shop')) {
            Reserve_DisableCancelReserveButton();
        }

        // get user id
        let user = Auth_GetUser();
        let uid = user.uid;

        // cancel reservation by calling shop route
        $.ajax({
            method: 'PUT',
            url: '/shop/remove/' + discType,
            data: {
                uid: uid
            }
        }).then(function(data) {
            // console log returned message
            console.log(data.message);

            // update number of reserved discs
            Utils_UpdateNumReservedDiscs();

            if (Utils_isPage('/shop')) {
                // display success modal!
                showReserveDetailModal('cancel');
            } else if (Utils_isPage('/cart')) {
                // remove reservation from cart
                removeReservation($this);
            }

            // hide loading popup
            Utils_ToggleLoadingIcon(false);
        })
        .catch(Utils_ThrowError);
    });
}

/**
 * Function adds click listener to "Reserve" button, and sends reservation
 * details to server
 * 
 * @param {string} discType - type of disc being reserved
 */
function Reserve_AddReserveListener(discType) {
    // get btn & unbind previously bound click events
    $reserveBtn = getReserveButton().unbind('click');

    // When the user clicks on the "Reserve" button (one-time)
    $reserveBtn.bind('click', function(e_click) {
        // show loading popup
        Utils_ToggleLoadingIcon(true);

        // unbind click event immediately
        $(this).unbind('click');

        // disable reserve button immediately
        $reserveBtn.prop('disabled', true);

        // get contact details
        let contactDetails = Utils_GetContactDetails();

        // get user details
        let user = Auth_GetUser();
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
                    discType: discType,
                    numDiscs: 1 // default is 1
                }
            }
        })
        .then(function(data) {
            // hide loading popup
            Utils_ToggleLoadingIcon(false);

            // update number of reserved discs
            Utils_UpdateNumReservedDiscs();

            // now show reserve success modal, hide disc detail modal
            showReserveDetailModal('success');
        })
        .catch(Utils_ThrowError);
    });
}

/**
 * Function removes reservation from cart
 * 
 * @param {object} $elem - jQuery reservation element to remove from DOM
 */
function removeReservation($elem) {
    $reservation = $elem.closest('.grid-6-reservation');
    $reservation.remove();
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

function Reserve_DisableCancelReserveButton() {
    let $cancelReserveBtn = getCancelReserveButton();
    if ($cancelReserveBtn.length > 0) $cancelReserveBtn.prop('disabled', true);
}
function Reserve_EnableCancelReserveButton() {
    let $cancelReserveBtn = getCancelReserveButton();
    if ($cancelReserveBtn.length > 0) $cancelReserveBtn.prop('disabled', false);
}

/**
 * Function hides all warnings, then displays the passed-in warning IF defined
 * 
 * @param {object} $warningElem - see above
 */
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
 * Functions sets cancel reserve button's display property to 'inline' or 'none'
 * 
 */
function Reserve_DisplayCancelReserveButton() {
    // get cancel reserve button
    let $btn = getCancelReserveButton();

    // enable button
    Reserve_EnableCancelReserveButton();

    // display button!
    $btn.css('display', 'inline');
}
function Reserve_HideCancelReserveButton() {
    // get cancel reserve button
    let $btn = getCancelReserveButton();

    // hide button!
    $btn.css('display', 'none');
}

/**
 * Function hides all reservation warnings and enables reservation button
 * 
 */
function Reserve_EnableReserve() {
    // hide all warnings
    Reserve_DisplayWarning();

    // hide cancel-reserve button
    Reserve_HideCancelReserveButton();

    // enable reserve button
    getReserveButton().prop('disabled', false);
}

// =========================== local functions =============================

function getReserveButton() {
    return $('.modal-footer-reserve .action-reserve');
}
function getCancelReserveButton(discType) {
    let buttonSelector = 'button.action-cancel-reserve';
    // get button corresponding to discType
    if (discType) {
        return $(`div[data-disc-type='${discType}']`).find(buttonSelector);
    }
    
    // no disc type, so get the (hopefully) 1 and only button
    else {
        return $(buttonSelector);
    }
}
function getReserveWarningHolder() {
    return $('.modal-footer-message');
}

/**
 * Function shows reserve detail modal & hides disc detail modal
 * @param {string} type - type of modal - 'success' or 'cancel'
 */
function showReserveDetailModal(type) {
    let $discDetailModal = $('.disc-detail-modal'),
        $reserveDetailModal = $('.reserve-detail-modal'),
        $reserveDetailFooterLinks = $('.reserve-detail-modal .reserve-detail-footer-link');

    // hide disc detail modal
    $discDetailModal.css('display', 'none');

    // hide all modal-footer-links, then display one randomly
    $reserveDetailFooterLinks.css('display', 'none');

    // display random footer link
    let $linkToDisplay = $( $reserveDetailFooterLinks[Utils_GetRandomInRange(0, 3)] );

    if ($linkToDisplay.length === 0) {
        Utils_ThrowError("Couldn't get reserve detail footer link");
    } else {
        $linkToDisplay.css('display', 'inline');        
    }

    // display different <p> tag depending on type
    let $pSuccess = $reserveDetailModal.find('p.reservation-success'),
        $pCancel = $reserveDetailModal.find('p.reservation-cancelled');
    
    // show success <p> tag
    if (type === 'success') {
        $pSuccess.css('display', 'inline');
        $pCancel.css('display', 'none');
    }

    // show cancel <p> tag
    else if (type === 'cancel') {
        $pSuccess.css('display', 'none');
        $pCancel.css('display', 'inline');
    }

    // error
    else {
        Utils_ThrowError(`Reserve Detail Modal type <${type}> not recognized :(`);
        return;
    }
    
    // show reserve detail modal
    $reserveDetailModal.css('display', 'block');
}