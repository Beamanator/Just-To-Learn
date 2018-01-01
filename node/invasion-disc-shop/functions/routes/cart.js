const express = require ('express');
const router = express.Router();

// const dbCalls = require('../extra-js/db-calls');
// const gsheetFns = require('../gsheet/gsheetFns');
// const utils = require('../extra-js/utils');

// get home page
router.get('/', function(req, res, next) {

    // get discs from dbCalls module
    // dbCalls.get_discs_with_filter(fbDB, filterObj).then(discs => {
        res.render('pages/cart', {});
    // }).catch(next);
});

module.exports = router;