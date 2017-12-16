const privateData = require('../extra-js/private-data');
const utils = require('../extra-js/utils');

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
 * Function gets sheets with titles "Reservations" and "History"
 * from the GoogleSpreadsheet document param
 * 
 * @param {GoogleSpreadsheet} doc - see above
 * @returns Promise to sheets with reservations & action history
 */
function get_shop_gsheets(doc) {
    let reservationSheetTitle = 'Reservations';
    let historySheetTitle = 'History';

    return new Promise( (resolve, reject) => {
        doc.getInfo(function(err, info) {
            if (err) reject(err);
            if (!info) reject('No spreadsheet info returned');

            // no errors... proceed!
            else {
                // get worksheets in spreadsheet from info obj
                let worksheets = info.worksheets;
                let sheetsObj = {};

                // find sheets with desired titles
                for (let sheet of worksheets) {
                    // check for reservation sheet
                    if (sheet.title === reservationSheetTitle) {
                        sheetsObj.reservationSheet = sheet;
                    }

                    // check for action history sheet
                    else if (sheet.title === historySheetTitle) {
                        sheetsObj.historySheet = sheet;
                    }
                }

                // if both sheets found, resolve successfully
                if (sheetsObj.reservationSheet && sheetsObj.historySheet) {
                    resolve(sheetsObj);
                }

                // otherwise throw error
                else {
                    // if we're here, didn't find sheets with correct titles :(
                    let errMsg = 'Worksheet: ' +
                        `<${reservationSheetTitle}-${sheetsObj.reservationSheet}>` +
                        ` or <${historySheetTitle}-${sheetsObj.historySheet}>` +
                        ' not found. Check google spreadsheet document.';

                    reject(errMsg);
                }
            }
        });
    });
};

/**
 * Function searches given sheet for reservation, based off reservation data and
 * start / increment data. If reservation is NOT found, recursively keeps trying
 * the next set of rows until either no rows are returned, or the desired
 * reservation is found.
 * 
 * @param {SpreadsheetWorksheet} sheet - see remove_reservation
 * @param {number} startRow - row to start searching in spreadsheet
 * @param {number} increment - number of rows to search at a time
 * @param {object} reserveData - see remove_reservation
 * @returns - Promise to found reservation row or error message
 */
function search_sheet(sheet, startRow, increment, reserveData) {
    let uid = reserveData.uid;
    let discType = reserveData.discType;

    return new Promise( (resolve, reject) => {

        get_rows( sheet, startRow, increment )
        .then(function(rows) {
            let reservationRow = undefined;
            
            // loop through rows, looking for reservation with:
            // 1) same uid, 2) same disc type
            for (let row of rows) {
                if (row['uid'] === uid && row['disctype'] === discType) {
                    reservationRow = row;
                    break;
                }
            }

            // if found, resolve and stop the search
            if (reservationRow) {
                resolve(reservationRow);
            }

            // not found, so search through next set of rows (if in range)
            else {
                // no more populated rows in sheet, so stop searching
                // Note: sheet.rowCount returns total rows (>1000),
                //  not total populated rows in sheet so can't use this
                if (rows.length === 0) {
                    let err = 'Reservation not found! ' +
                        `DiscType<${discType}> uid<${uid}>`;

                    // throw error - a reservation should always be found
                    reject({message: err});
                }

                // there are more rows with data, search them!
                else {
                    let newStart = startRow + increment;

                    // search sheet again, with adjusted starting row
                    search_sheet( sheet, newStart, increment, reserveData )
                    .then(resolve)
                    .catch(reject);
                }

            }
        }).catch(reject);
        
    });
};

/**
 * Function gets SpreadsheetRows from specified sheet, based on params
 * 
 * @param {SpreadsheetWorksheet} sheet - see search_sheet
 * @param {number} startRow - see search_sheet
 * @param {number} increment - see search_sheet
 * @returns - Promise to array of SpreadsheetRow objects
 */
function get_rows(sheet, startRow, increment) {
    return new Promise( (resolve, reject) => {

        // get array of SpreadsheetRow objects
        sheet.getRows({
            offset: startRow,
            limit: increment
        }, function( err, rows ) {
            if (err) reject({message: err});
            else resolve(rows);
        });

    });
};

/**
 * Function adds action data to the passed-in history spreadsheet
 * 
 * @param {SpreadsheetWorksheet} historySheet - sheet where action history goes
 * @param {object} rowData - row data to be placed in history sheet
 * @param {string} action - action to be recorded in history
 * @returns - Promise to successfully adding data or failing
 */
function add_action_to_history(historySheet, rowData, action) {
    return new Promise( (resolve, reject) => {
        // NOTE: as mentioned in docs, keys in row are ALL lowercase
        //  (and spaces are removed)
        historySheet.addRow({
            timestamp: rowData.timestamp,
            disctype: rowData.disctype,
            action: action,
            uid: rowData.uid
        }, function( err, row ) { // row param is SpreadsheetRow object
            if (err) reject(err);

            else {
                let successMsg = 'History update successful - added row!';

                resolve({
                    message: successMsg,
                    reservationRow: rowData,
                    historyRow: row
                });
            }
        });
    });
}

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
            if (!doc) reject({message: 'GoogleSpreadsheet doc undefined'});

            set_gsheet_auth(doc)
            .then(get_shop_gsheets)
            .then(resolve) // pass on sheets object
            .catch(reject);
        });

    },

    /**
     * Function adds a row to the passed-in reservation Google Spreadsheet. Row 
     * contains reservation information (including user & disc details)
     * Also adds reservation to history sheet
     * 
     * @param {object} gsheetContainer - obj containing SpreadsheetWorksheets
     * @param {object} reserveDetails - obj with reservation details
     * @returns - Promise to row being added to spreadsheet
     */
    add_reservation: function(gsheetContainer, reserveDetails) {
        let reservationSheet = gsheetContainer.reservationSheet;
        let historySheet = gsheetContainer.historySheet;

        return new Promise( (resolve, reject) => {
            if (!reservationSheet) {
                reject({message: 'reservation SpreadsheetWorksheet undefined'});
                return;
            }

            // NOTE: as mentioned in docs, keys in row are ALL lowercase
            //  (and spaces are removed)
            reservationSheet.addRow({
                timestamp: utils.get_current_date_string(),
                firstname: reserveDetails.firstName,
                lastname: reserveDetails.lastName,
                email: reserveDetails.email,
                phone: reserveDetails.phoneNumber,
                disctype: reserveDetails.discType,
                uid: reserveDetails.uid
            }, function( err, row ) { // row param is SpreadsheetRow object
                if (err) reject(err);

                // no error! woot!
                else {
                    // add row to history as well!
                    add_action_to_history(historySheet, row, 'Disc Reserved')
                    .then(function(data) {
                        let resSuccessMsg = 'Reservation success - added row!/';
                        
                        resolve(resSuccessMsg + data.message);
                    })
                    .catch(reject);
                }
            });
        });

    },

    /**
     * Function deletes a reservation row from specified spreadsheet
     * Starts reservation search at the beginning of the reservation sheet.
     * Also adds row to history sheet
     * 
     * @param {object} gsheetContainer - see above
     * @param {object} reserveData - container for reservation data
     * @returns - Promise to reservation deleted or rejected error
     */
    remove_reservation: function(gsheetContainer, reserveData) {
        let reservationSheet = gsheetContainer.reservationSheet;
        let historySheet = gsheetContainer.historySheet;

        let startRow = 1;
        let increment = 10;

        return new Promise( (resolve, reject) => {

            search_sheet(reservationSheet, startRow, increment, reserveData)
            .then(function(row) {
                // found row, now add 'reservation cancelled' action to history
                let action = 'Reservation Cancelled';

                return add_action_to_history(historySheet, row, action);
                
            })
            .then(function(data) {
                let reservationRow = data.reservationRow;

                // Delete row from reservation sheet
                reservationRow.del(function(err) {
                    if (err) reject(err);
                    else resolve(reservationRow);
                });
            })
            .catch(reject);

        });
    }
};

module.exports = functions;