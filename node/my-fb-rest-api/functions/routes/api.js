const express = require ('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    console.log('Process GET req');
    
    // get only ninjas that are near a specified lat / lng
    Ninja.geoNear({
        type: "Point",
        coordinates: [
            parseFloat(req.query.lng),
            parseFloat(req.query.lat)
        ]
    }, {
        maxDistance: 100000, // -> in meters
        spherical: true // -> find distance based on sphere
    })
    .then(function(ninjas) {
        // results come back in descending order (nearest ninjas)
        res.send(ninjas);
    })
    .catch(next);

    // find all ninjas:
    // Ninja.find({})
    // .then(function(ninjas) {
    //     res.send(ninjas);
    // });
});

// add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    console.log('Process POST req');

    Ninja.create(req.body)
    .then(function(ninja){
        res.send(ninja);
    })
    // if fail, run next piece of middleware (our error handling)
    .catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    console.log('Process PUT req');
    
    Ninja.findByIdAndUpdate({
        _id: req.params.id
    }, req.body)
    .then(function(oldNinja) {
        // oldNinja is out-dated ninja object (not useful), so get updated ninja
        Ninja.findOne({
            _id: req.params.id
        })
        .then(function(newNinja) {
            res.send(newNinja);
        });
    })
    // if fail, run next piece of middleware (our error handling)
    .catch(next);
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    console.log('Process DELETE req');

    Ninja.findByIdAndRemove({
        _id: req.params.id
    })
    .then(function(ninja) {
        res.send(ninja);
    })
    // if fail, run next piece of middleware (our error handling)
    .catch(next);
});

module.exports = router;
