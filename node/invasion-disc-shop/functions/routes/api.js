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
    let fbApp = req.app.get('fb-app');

    // get discs from dbCall module
    dbCalls.get_discs_with_filter(fbApp, filterObj).then(discs => {

        // TODO: filter discs based off filterObj
        sendObj.filter = filterObj;
        sendObj.discs = discs;

        res.send(sendObj);
    })
    .catch(next);
});

router.get('/disc-picture-settings', function(req, res, next) {
    let sendObj = {};
    let fbApp = req.app.get('fb-app');

    dbCalls.get_disc_picture_settings(fbApp).then(disc_settings_map => {
        // add map to output object
        sendObj.disc_settings_map = disc_settings_map;
        
        res.send(sendObj);
    })
    .catch(next);
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
