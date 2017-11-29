const express = require ('express');
const router = express.Router();

const dbCalls = require('../extra-js/db-calls');
const utils = require('../extra-js/utils');

// ================== SHOP API ROUTES ==================
router.get('/discs', function(req, res, next){
    let sendObj = {};
    let filterString = req.query.filtArr;

    // get valid filter in an object from query string
    let filterObj = utils.getValidFilterObj(filterString);
    let fbDB = req.app.get('fb-db');

    // get discs from dbCall module
    dbCalls.get_discs_with_filter(fbDB, filterObj).then(discs => {

        // TODO: filter discs based off filterObj
        sendObj.filter = filterObj;
        sendObj.discs = discs;

        res.send(sendObj);
    })
    .catch(next);
});
router.get('/disc-picture-settings', function(req, res, next) {
    let sendObj = {};
    let fbDB = req.app.get('fb-db');

    dbCalls.get_disc_picture_settings(fbDB).then(disc_settings_settings => {
        // add map to output object
        sendObj.disc_settings_settings = disc_settings_settings;
        
        res.send(sendObj);
    })
    .catch(next);
});
router.get('/disc-picture-map', function(req, res, next) {
    let sendObj = {};
    let fbDB = req.app.get('fb-db');

    dbCalls.get_disc_picture_map(fbDB).then(disc_pic_map => {
        sendObj.disc_pic_map = disc_pic_map;

        res.send(sendObj);
    })
    .catch(next);
});
router.get('/reserved', function(req, res, next) {
    let fbDB = req.app.get('fb-db');
    
    let uid = req.query.uid;
    let discType = req.query.discType;

    // check uid is valid
    if (!uid) {
        status = 'error';
        msg = 'UID Invalid / missing';
        next({message: {    status: status,     msg: msg    }});
        return;
    }
    // check discType is valid
    else if (!discType) {
        status = 'error';
        msg = 'Disc Type Invalid / missing';
        next({message: {    status: status,     msg: msg    }});
        return;
    }

    dbCalls.get_disc_reserved_holder(fbDB).then(disc_reserved_holder => {
        let status = '',
            msg = '';

        let drh = disc_reserved_holder;
        
        // check if discType is in drh
        if (!drh[discType]) {
            status = 'not reserved';
            msg = 'Disc Never Reserved Yet';
        }
        // check if user has reserved this disc before
        else if (!drh[discType]['users'][uid]) {
            status = 'not reserved';
            msg = 'Disc Never Reserved By User';
        }
        // user has already reserved disc
        // TODO: does it matter if it was reserved > 30 days ago? or something like this?
        else {
            status = 'reserved';
            msg = 'Disc Available To Be Reserved';
        }

        let returnObj = {
            status: status,
            msg: msg
        };

        res.send(returnObj);
    });
})

// add a new disc to the db
router.post('/discs', function(req, res, next){
    // maybe last?
    res.send({type: 'POST'});
});

// update a disc in the db
router.put('/discs/:id', function(req, res, next){
    res.send({type: 'PUT'});
});

// delete a disc from the db
router.delete('/discs/:id', function(req, res, next){
    res.send({type: 'DELETE'});
});
// ================= END -> shop api routes

// ================== NINJA ROUTES ==================
// get a list of ninjas from the db
// router.get('/ninjas', function(req, res, next){
//     console.log('Process GET req');
    
//     // get only ninjas that are near a specified lat / lng
//     Ninja.geoNear({
//         type: "Point",
//         coordinates: [
//             parseFloat(req.query.lng),
//             parseFloat(req.query.lat)
//         ]
//     }, {
//         maxDistance: 100000, // -> in meters
//         spherical: true // -> find distance based on sphere
//     })
//     .then(function(ninjas) {
//         // results come back in descending order (nearest ninjas)
//         res.send(ninjas);
//     })
//     .catch(next);

//     // find all ninjas:
//     // Ninja.find({})
//     // .then(function(ninjas) {
//     //     res.send(ninjas);
//     // });
// });

// // add a new ninja to the db
// router.post('/ninjas', function(req, res, next){
//     console.log('Process POST req');

//     Ninja.create(req.body)
//     .then(function(ninja){
//         res.send(ninja);
//     })
//     // if fail, run next piece of middleware (our error handling)
//     .catch(next);
// });

// // update a ninja in the db
// router.put('/ninjas/:id', function(req, res, next){
//     console.log('Process PUT req');
    
//     Ninja.findByIdAndUpdate({
//         _id: req.params.id
//     }, req.body)
//     .then(function(oldNinja) {
//         // oldNinja is out-dated ninja object (not useful), so get updated ninja
//         Ninja.findOne({
//             _id: req.params.id
//         })
//         .then(function(newNinja) {
//             res.send(newNinja);
//         });
//     })
//     // if fail, run next piece of middleware (our error handling)
//     .catch(next);
// });

// // delete a ninja from the db
// router.delete('/ninjas/:id', function(req, res, next){
//     console.log('Process DELETE req');

//     Ninja.findByIdAndRemove({
//         _id: req.params.id
//     })
//     .then(function(ninja) {
//         res.send(ninja);
//     })
//     // if fail, run next piece of middleware (our error handling)
//     .catch(next);
// });
// ================== END -> ninja routes ==================

module.exports = router;
