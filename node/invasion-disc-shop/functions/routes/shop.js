const express = require ('express');
const router = express.Router();

const dbCalls = require('../extra-js/db-calls');
const gsheetFns = require('../gsheet/gsheetFns');
const utils = require('../extra-js/utils');

// get home page
router.get('/', function(req, res, next) {    
    let viewData = {};
    let filterString = req.query.filtArr;

    // get valid filters in an object from query string
    let filterObj = utils.get_valid_filter_obj(filterString);
    let fbDB = req.app.get('fb-db');

    // get discs from dbCalls module
    dbCalls.get_discs_with_filter(fbDB, filterObj).then(discs => {
        res.render('index', {
            filter: filterObj,
            discs: discs
        });
    }).catch(next);
});

// delete a reservation!
router.put('/remove/:discType', function(req, res, next) {
    let uid = req.body.uid;
    let discType = req.params.discType;
    let gsheet = req.app.get('gsheet-reservation');

    gsheetFns.remove_reservation(gsheet, {
        uid: uid,
        discType: discType
    })
    .then(function(row) {
        // Note: row available to pass on, but not needed now
        res.send({
            message: 'Reservation deleted successfully'
        });
    }).catch(next);
});

// reserve a disc!
router.post('/reserve/:discType', function(req, res, next) {
    let uid = req.body.uid;
    let reserveDetails = req.body.reserveDetails;
    let discType = req.params.discType;

    // throw error if data invalid
    if (!uid || !discType) {
        next({
            message: `Error with uid<${uid}> or discType<${discType}>`
        });
        return;
    }

    // add uid to reserveDetails
    reserveDetails.uid = uid;

    // get vars for reservation!
    let fbDB = req.app.get('fb-db');
    let gsheet = req.app.get('gsheet-reservation');

    // store disc reserve data in database
    dbCalls.store_disc_reserve(fbDB, uid, discType)
    .then(function() {
        return gsheetFns.add_reservation(gsheet, reserveDetails);
    })
    .then(function(msg) {
        res.send({
            type: discType,
            msg: msg
        });
    }).catch(next);
});

module.exports = router;