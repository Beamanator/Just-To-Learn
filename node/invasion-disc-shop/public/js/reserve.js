function Reserve_HandleReserve(config) {
    // get data from config
    let reservedStatus = config.reservedStatus;
    let discType = config.discType;
    let uid = config.uid;

    // get jQuery elems
    let $modal = $('div.disc-detail-modal');

    let $reserveBtn = getReserveButton(),
        $discNotAvailableMsg = $('.reserve-disc-not-available-warning'),
        $contactDetailsEmptyMsg = $('.contact-details-empty-warning');

    let $contactDetails = $('.modal-body .contact-details');

    // only a 'not reserved' status should allow the user to reserve discs
    if (reservedStatus.status === 'not reserved') {

        // display contact details
        $contactDetails.css('display', 'grid');

        // if any fields are not filled out, don't allow reservation
        if ( Utils_CheckContactDetailsFilled() ) {
            Reserve_DisableReserve($contactDetailsEmptyMsg);
        }

        // fields are filled out, allow reservation
        else {
            Reserve_EnableReserve();

            // When the user clicks on the "Reserve" button (one-time)
            $reserveBtn.one('click', function(e_click) {
                // disable reserve button
                $reserveBtn.prop('disabled', true);

                $.ajax({
                    type: 'POST',
                    url: '/shop/reserve/' + discType,
                    data: {
                        uid: uid
                    }
                })
                .then(function(data) {
                    console.info('msg:', data.msg);

                    // TODO: send data to google spreadsheet
                    // -> maybe in node?
                })
                .catch(Utils_ThrowError);
            });
        }
    }
    
    // otherwise (status could be 'error' or 'reserved') -> disable button
    else {
        Reserve_DisableReserve($discNotAvailableMsg);
    }

    // do this last so html has already been updated
    $modal.css('display', 'block');
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