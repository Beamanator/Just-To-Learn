var privateData = require('../extra-js/private-data');

// api documentation: https://github.com/theoephraim/node-google-spreadsheet
 
// spreadsheet key is the long id in the sheets URL 
// var doc = new GoogleSpreadsheet('1oBbx9vq7rSPlX1OA7HuZlK7ohn3mcIf7E28pmZyqjYE');
// var sheet;

// ================= internal functions =========================
/**
 * Function sets gsheet auth token with service account details
 * 
 * @param {GoogleSpreadsheet} doc - document from GoogleSpreadsheet module
 * @returns Promise to service account auth
 */
function set_gsheet_auth(doc) {
    return new Promise( (resolve, reject) => {
        // get credentials
        var creds = privateData.disc_reserver_service_account;
        
        // "Uses a service account email and public/private key to create a token
        //  to use to authenticated requests"
        doc.useServiceAccountAuth(creds, function(err) {
            if (err) reject(err);
            else resolve(doc);
        });
    });
};

/**
 * Function gets sheet with title "Reservations" from the GoogleSpreadsheet document
 * 
 * @param {GoogleSpreadsheet} doc - see above
 * @returns Promise to sheet with reservations
 */
function get_reservation_wsheet(doc) {
    let reservationSheetTitle = 'Reservations';

    return new Promise( (resolve, reject) => {
        doc.getInfo(function(err, info) {
            if (err) reject(err);

            // get worksheets in spreadsheet from info obj
            let worksheets = info.worksheets;

            // find sheet with desired title
            for (let sheet of worksheets) {
                if (sheet.title === reservationSheetTitle) {
                    resolve(sheet);
                    break;
                }
            }

            // if we're here, didn't find a sheet with correct title :(
            let errNotFound = 'Worksheet with title: ' +
                `<${reservationSheetTitle}> not found. Check google spreadsheet.`;

            reject(errNotFound);
        });
    });
};

// =========================== exposed functions =============================

const functions = {
    /**
     * Function initializes Google Spreadsheet work. Calls appropriate functions
     * that authorize things, then gets sheet, passes it to caller
     * 
     * @param {GoogleSpreadsheet} doc - see above
     * @returns Promise to get reservation sheet
     */
    gsheet_init: function(doc) {

        return new Promise( (resolve, reject) => {
            set_gsheet_auth(doc)
            .then(get_reservation_wsheet)
            .then(resolve) // pass on sheet
            .catch(reject);
        });

    },

    /**
     * Function adds a row to the passed-in Google Spreadsheet 'sheet'. Row 
     * contains reservation information (including user & disc details)
     * 
     * @param {SpreadsheetWorksheet} sheet - the 'sheet' (not spreadsheet) with reservations
     * @param {object} reservDetails - obj with reservation details
     * @returns Promise to row being added to spreadsheet
     */
    add_reservation: function(sheet, reservDetails) {

        return new Promise( (resolve, reject) => {
            // NOTE: as mentioned in docs, keys in row are ALL lowercase
            //  (and spaces are removed)
            sheet.addRow({
                timestamp: reservDetails.timestamp,
                firstname: reservDetails.firstName,
                lastname: reservDetails.lastName,
                email: reservDetails.email,
                phone: reservDetails.phoneNumber,
                disctype: reservDetails.discType
            }, function( err, row ) {
                if (err) reject(err);

                else {
                    let successMsg = 'Reservation success - added row!';

                    resolve(successMsg);
                }
            });
        });

    }
};

module.exports = functions;