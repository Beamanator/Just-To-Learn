const express = require ('express');
const router = express.Router();

const dbCalls = require('../extra-js/db-calls');
const utils = require('../extra-js/utils');

// get home page
router.get('/', function(req, res, next) {    
    let viewData = {};
    let filterString = req.query.filtArr;

    // get valid filters in an object from query string
    let filterObj = utils.getValidFilterObj(filterString);
    let fbDB = req.app.get('fb-db');

    // get discs from dbCalls module
    dbCalls.get_discs_with_filter(fbDB, filterObj).then(discs => {
        res.render('index', {
            filter: filterObj,
            discs: discs
        });
    });
});

module.exports = router;