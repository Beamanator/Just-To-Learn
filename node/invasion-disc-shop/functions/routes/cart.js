const express = require ('express');
const router = express.Router();

// const dbCalls = require('../extra-js/db-calls');
// const gsheetFns = require('../gsheet/gsheetFns');
// const utils = require('../extra-js/utils');

// get shopping cart
router.get('/', function(req, res, next) {
    let uid = req.query.uid;

    // if there's no uid passed in, auto direct to shop.
    if (!uid) {
        res.redirect('/shop');
    }

    // uid passed (not sure if valid yet), so try to get reserved disc data
    else {
        // TODO: get reserved disc data -> If uid invalid, redirect to shop!
        res.render('pages/cart', {
            uid: uid
        });
    }

    // get discs from dbCalls module
    // dbCalls.get_discs_with_filter(fbDB, filterObj).then(discs => {
        
    // }).catch(next);
});

module.exports = router;