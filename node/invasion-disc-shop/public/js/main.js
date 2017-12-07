$(document).ready(function(){

    Main_SetupFilters();
    Main_PutDiscImages();
    Main_SetupDiscDetailModal();

    Main_SetupContactDetailListeners();
    Main_SetupContactUpdateListener();
    
});

// ========================== from main setup =============================
/**
 * Function puts disc images into html after getting data from firebase.
 * 
 * @returns - nothing - return only used when exiting early
 */
function Main_PutDiscImages() {
    // get firebase storage ref
    let imageRef = firebase.storage().ref('disc-shop-pics');

    // get jQuery array of all discs on page
    let $discs = $('div.grid-3-disc');

    // get disc type map from api
    $.ajax({
        method: "GET",
        url: "/api/disc-picture-map"
    })
    .then(function(data) {
        let discPictureMap = data.disc_pic_map;
    
        // loop through disc divs, setting image urls
        for (let disc of $discs) {
            // get disc type from html data attribute
            let discType = $(disc).data('discType');

            // get file type from file-type map
            let discData = discPictureMap[discType];

            let backgroundColor = discData.background_color;
            let imgbbLink = discData.imgbb_link;

            // skip to next part of the loop if link is empty
            if (!imgbbLink) continue;

            // set new disc css
            setDiscCSS( $(disc), {
                url: imgbbLink,
                backgroundColor: backgroundColor
            });
        }
    })
    .catch(function(err) {  console.error('get-api-disc-picture-map->',err);  });
}

/**
 * Function sets up filters for app
 * 1) set up click listener on filters
 *    - When clicked, set filter as query string and reload page
 * 2) if query string has multiple filters, refresh with only the first filter
 * 
 */
function Main_SetupFilters() {
    let $gridFilters = $('.grid-2-filter');

    // set up listener for filter clicks:
    $gridFilters.click(function(e_click) {
        let $activeFilter = $('.grid-2-filter.active'),
            $clickedFilter = $(this);;

        // de-activate currently active filter, then activate clicked filter
        $activeFilter.toggleClass('active');
        $clickedFilter.toggleClass('active');

        // create new query string from filter vars
        let newQS = createFilterQueryString($clickedFilter, $activeFilter);

        // add query string to URL bar (don't refresh page)
        window.history.pushState('new Filter: ' + newQS, "Title", "/shop" + newQS);

        // re-create store display
        $.ajax({
            method: "GET",
            url: "/api/discs" + newQS
        })
        .then(function(storeData) {
            let discHtml = buildDiscHtml(storeData.discs);

            $('div.grid-1-discs').html(discHtml);

            // html has been added, now get disc images
            Main_PutDiscImages();
            Main_SetupDiscDetailModal();
        })
        .catch(Utils_ThrowError);
    });
}

/**
 * Function sets up disc click events & modal data
 * 
 */
function Main_SetupDiscDetailModal() {
    let $discs = $('div.grid-3-disc'),
        $modal = $('div.disc-detail-modal'),
        $modalCloseBtn = $('button.close');

    // When the user clicks a disc, open the modal
    $discs.click(function(e_click) {
        // get data-* properties from html element (dics) that was clicked
        let discData = $(this).data();

        // get jquery Modal
        let $modal = $('div.disc-detail-modal');

        // put disc data into modal html
        $('.modal-content span.author').text(discData.author);
        $('.modal-content span.category').text(discData.category);
        $('.modal-content span.disc-type').text(discData.discType);

        $('.modal-content span.stock').text(discData.stock);
        $('.modal-content span.title').text(discData.title);
        $('.modal-content span.total-purchased').text(discData.totalPurchased);

        // Get logged-in user
        let user = Auth_getUser();

        // If user exists, check reserved status of disc
        if (user) {
            $.ajax({
                method: 'GET',
                url: `/api/reserved?discType=${discData.discType}&uid=${user.uid}`
            })
            .then(function(reservedStatus) {
                Reserve_HandleReserve({
                    discType: discData.discType,
                    reservedStatus: reservedStatus
                });

                // do this last so html has already been updated
                $modal.css('display', 'block');
            }).catch(Utils_ThrowError);
        }

        // otherwise, just display modal
        else {
            $modal.css('display', 'block');
        }
    });

    // When the user clicks on <span> (x), close the modal
    $modalCloseBtn.click( function(e_click) {
        $modal.css('display', 'none');
    });

    // If window is clicked and model is shown AND model outside of content is clicked
    // -> close the modal
    $(window).click(function(e_click) {
        if ($modal.css('display') !== 'none' && $modal.is(event.target))
            $modal.css('display', 'none');
    });
}

/**
 * Function sets a jQuery blur on contact detail inputs. When data is
 * changed, update css of button to remind user to save data
 * 
 */
function Main_SetupContactDetailListeners() {
    let $contactDetailInputs = $('.contact-details input');

    $contactDetailInputs.change(function(e_blur) {
        Utils_ContactNeedsSaveUpdateCSS();
    });
}

/**
 * Function creates click event on button to update contact details of user.
 * Contact details are stored in FB - all are required!
 * 
 */
function Main_SetupContactUpdateListener() {
    // get jQuery elems
    let $updateContact = $('.contact-details button');
    let $contactDetailWarning = $('.contact-details-empty-warning');

    // reserve button clicked! try to store new contact data to db
    $updateContact.click(function(e_click) {
        $thisButton = $(this);

        // if fields not filled out, display warning
        if ( !Utils_CheckContactDetailsFilled() ) {
            Reserve_DisplayWarning($contactDetailWarning);
        }

        // else, fields are filled out -> Store new data
        else {
            let contactDetails = Utils_GetContactDetails();

            // update user's contact info
            $.ajax({
                method: 'PUT',
                url: '/auth/update-contact',
                data: {
                    uid: Auth_getUserID(),
                    updatedInfo: {
                        firstName: contactDetails.firstName,
                        lastName: contactDetails.lastName,
                        phoneNumber: contactDetails.phoneNumber
                    }
                }
            })
            .then(function(data) {
                // successfully updated, now display save message to user
                let $msg = $('.contact-update-message'); 

                $msg.css('display', 'flex');
                $msg.hide(1500);

                // color button border and color back to black
                Utils_ContactSavedUpdateCSS($thisButton);

                // add click event to reserve button (it's un-hidden soon)
                let discType = $('.modal-body .disc-type')
                    .text().trim().toLowerCase();
                Reserve_AddReserveListener(discType);

                // re-enable reserve button
                Reserve_EnableReserve();
            }).catch(Utils_ThrowError);
        }
    });
}


function Main_SetUserContactInfo(uid) {
    let $firstName = $('.contact-details .first-name'),
        $lastName = $('.contact-details .last-name'),
        $phoneNumber = $('.contact-details .phone-number');

    // get contact into from uid
    $.ajax({
        method: 'GET',
        url: '/auth/contact-details/' + uid
    })
    .then(function(data) {
        // store data in jQuery elems
        $firstName.val( data.firstName );
        $lastName.val( data.lastName );
        $phoneNumber.val( data.phoneNumber );
    }).catch(Utils_ThrowError);
}

// ======================== internal ============================

/**
 * Function sets some css properties on $disc jQuery elem
 * 
 * @param {object} $disc - disc div element to add css attributes to
 * @param {object} cssObj - object with css attributes for $disc element
 */
function setDiscCSS($disc, cssObj) {
    let url = cssObj.url;
    let backgroundColor = cssObj.backgroundColor;

    // add background-url and background-size css elems
    $disc.css('background-image', `url("${url}")`);
    $disc.css('background-size', '100%');

    let textColor;

    switch (backgroundColor) {
        case 'white':
            textColor = 'black';
            break;
        case 'purple':
            textColor = 'white';
            break;

        // if pic is png with no background, background comes from css
        // -> which means purple, most likely
        case 'none':
            textColor = 'white';
            break;
        default:
            textColor = 'black';
    }

    // add 'color' css to elem
    $disc.css('color', textColor);
}

/**
 * Function builds html for disc store grid. Some data is passed from the
 * params into the html. If no discs are passed in, still generate 1 default disc
 * 
 * NOTE: if html is changed here, also must be changed in views/index
 * 
 * @param {object} discHolder - object holding disc data
 * @returns {string} - html string that will be disc grid
 */
function buildDiscHtml(discHolder) {
    let html = '';

    // if empty, add an 'empty' disc
    if (Object.keys(discHolder).length === 0) {
        html += '<div class="grid-3-disc grid-3_2"' +
            'data-disc-type="disc-undefined">' +
        '</div>';
    }

    // if there is at least 1 disc in array, built out html here
    else {
        Object.keys(discHolder).forEach(function(key, index) {
            let disc = discHolder[key];

            html += '<div class="grid-3-disc grid-3_2"' +
                `data-author="${disc.author}"` +
                `data-category="${disc.category}"` +
                `data-stock="${disc.stock}"` +
                `data-title="${disc.title}"` +
                `data-total-purchased="${disc.total_purchased}"` +
                `data-disc-type="${key}">` +
                `<div class="grid-3_2-discs-stock">${disc.stock}</div>` +
            '</div>';
        });
    }

    return html;
}

/**
 * Function creates a new query string of FILTERS. Only one filter can be active!
 * 
 * @param {object} $clickedFilter - (jQuery) clicked filter on page
 * @param {array} activeFilters - array of active filters
 * @returns {string} - new query string
 */
function createFilterQueryString($clickedFilter, $activeFilters) {
    let filterQS = '',
        initialQS = '?filtArr=';
    
    let activeElemName = $activeFilters.attr('name'),
        clickedFilterName = $clickedFilter.attr('name');
    
    if (activeElemName !== clickedFilterName) {
        filterQS = clickedFilterName;
    }

    // if there is some query string text, get rid of first comma
    // - and return it
    if (filterQS)
        return initialQS + filterQS;
    else
        return '';
}