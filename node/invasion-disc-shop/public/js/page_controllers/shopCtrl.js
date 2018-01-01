/**
 * Main javascript file for shop page - $(document).ready only fired on shop page
 */
$(document).ready(function(){

    // disc stuff
    Main_SetupFilters();
    Main_PutDiscImages();
    Main_SetupDiscDetailModal();

    // auth stuff
    Auth_SetupStateChangeListener({
        incrementLoginCount: true,
        hasDiscDetailModal: true,
        redirectOnLogout: false
    });

    // contact detail stuff
    Main_SetupContactDetailListeners();
    Main_SetupContactUpdateListener();
    
});