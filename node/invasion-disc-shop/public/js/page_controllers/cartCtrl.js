/**
 * Main javascript file for "my reservations" page
 * $(document).ready only fired on this one page
 */
$(document).ready(function(){

    // auth stuff
    Auth_SetupStateChangeListener({
        incrementLoginCount: false,
        hasDiscDetailModal: false,
        redirectOnLogout: true
    });

    // setup dropdown / # reserved change listener
    Cart_SetupNumReservedChangeListener();
    
    // add cancel reserve listeners on all discs
    let $reservations = $('.grid-6-reservation');
    for (let reservation of $reservations) {
        // get discType from 'data-disc-type' html attribute
        Reserve_AddCancelReserveListener(reservation.dataset.discType);

        // TODO: get number of reservations per disc, update display
        // -> maybe also display loading icon for each?
    }
});

function Cart_SetupNumReservedChangeListener() {
    let $numReservedDropdown = $('.grid-7-num-reserved .numReserved');

    // loop through dropdowns, setting up change listeners
    $numReservedDropdown.each((i, elem) => {
        let $dropdown = $(elem);

        $(elem).on('change', function (e_change) {
            let $reservation = $dropdown.closest('.grid-6-reservation');
            
            // get data needed for update
            let numReserved = $(this).val();
            let discType = $reservation.data().discType;
            let uid = Auth_GetUserID();

            // Update database & spreadsheet!
            $.ajax({
                method: 'PUT',
                url: '/cart/update-reservation/' + discType,
                data: {
                    uid: uid,
                    numReserved: numReserved
                }
            })
            .then(function(msg) {
                if (msg.message) console.log(msg.message);
            })
            .catch(Utils_ThrowError);
        });
    });
}