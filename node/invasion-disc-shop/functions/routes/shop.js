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
    }).catch(next);
});

// reserve a disc!
router.post('/reserve/:discType', function(req, res, next) {
    let fbDB = req.app.get('fb-db');
    
    let uid = req.body.uid;
    let discType = req.params.discType;

    // throw error if data invalid
    if (!uid || !discType) {
        next({
            message: `Error with uid<${uid}> or discType<${discType}>`
        });
        return;
    }

    // store disc reserve data in database
    dbCalls.store_disc_reserve(fbDB, uid, discType).then(function() {
        res.send({
            type: discType,
            msg: 'success'
        });
    }).catch(next);
});

module.exports = router;