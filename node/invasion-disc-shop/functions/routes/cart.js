const express = require ('express');
const router = express.Router();

const dbCalls = require('../extra-js/db-calls');
// const gsheetFns = require('../gsheet/gsheetFns'); // TODO: update # of discs reserved
// const utils = require('../extra-js/utils');

// get shopping cart
router.get('/', function(req, res, next) {
    let uid = req.query.uid;
    let fbDB = req.app.get('fb-db');

    // if there's no uid passed in, auto direct to shop.
    if (!uid) {
        res.redirect('/shop');
    }

    // uid passed (not sure if valid yet), so try to get reserved disc data
    else {
        let reservationDataArr = [];
        
        dbCalls.get_discs_reserved_by_user(fbDB, uid)
        .then(discs_reserved => {
            // if no discs, don't fail, just keep going
            let dataPromises = [];

            // loop through reserved discs, get disc details
            Object.keys(discs_reserved).forEach((key, i) => {
                // store disc types onto obj
                reservationDataArr.push({});
                reservationDataArr[i].discType = key;

                // get data from disc_holder
                dataPromises.push(
                    dbCalls.get_discs(fbDB, '/' + key)
                );

                // get data from disc_picture_map
                dataPromises.push(
                    dbCalls.get_disc_picture_map(fbDB, '/' + key)
                );
            });

            return Promise.all(dataPromises);
        })
        .then((discDataArr) => {
            // loop through discDataArray, combine with reservationDataArray
            for (let i = 0; i < reservationDataArr.length; i++) {
                // get current reservation object & disc data object
                let reservationObj = reservationDataArr[i];
                let discBasicDataObj = discDataArr[i*2];
                let discUrlDataObj = discDataArr[i*2 + 1];

                // add properties from discDataArr
                Object.assign(reservationObj, discBasicDataObj, discUrlDataObj);

                // NOTE: reservationObj updates INSIDE reservationDataArr, so no need
                // to store updated obj back in array.
            }

            // if empty, uid may not be valid OR 
            res.render('pages/cart', {
                itemsReserved: reservationDataArr
            });
        })
        .catch(next);
    }
});

module.exports = router;