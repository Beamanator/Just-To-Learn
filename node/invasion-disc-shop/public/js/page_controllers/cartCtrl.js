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

    // TODO: setup dropdown / # reserved change listener
    
    // add cancel reserve listeners on all discs
    let $reservations = $('.grid-6-reservation');
    for (let reservation of $reservations) {
        // get discType from 'data-disc-type' html attribute
        Reserve_AddCancelReserveListener(reservation.dataset.discType);
    }
});