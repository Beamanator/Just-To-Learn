const express = require ('express');
const router = express.Router();

const dbCalls = require('../extra-js/db-calls');
const utils = require('../extra-js/utils');

// get contact details of user
router.get('/contact-details/:uid', function(req, res, next) {
    let uid = req.params.uid;
    let fbDB = req.app.get('fb-db');

    let returnObj = {};

    if (uid) {
        dbCalls.get_user(fbDB, uid)
        .then(function(user) {
            // return only contact details
            returnObj = {
                firstName: user.first_name,
                lastName: user.last_name,
                phoneNumber: user.phone_number
            };
    
            res.send(returnObj);
        }).catch(next);
    }

    else {
        returnObj = {
            firstName: '',
            lastName: '',
            phoneNumber: ''
        };

        res.send(returnObj);
    }
});

// creates / updates user information
router.post('/login', function(req, res, next) {
    let uid = req.body.uid;
    let fbDB = req.app.get('fb-db');

    // get current date string
    let dateString = utils.get_current_date_string();

    // get this user's data
    dbCalls.get_user(fbDB, uid)
    .then(function(user) {
        // if no user found, create one!
        if (!user) {
            dbCalls.create_user(fbDB, uid, {
                last_login: dateString
            })
            .then(function(none) {
                res.send({msg: 'created successfully'});
            }).catch(next);
        }

        // else, user found so update last login & login count
        else {
            dbCalls.update_user_login(fbDB, uid, {
                last_login: dateString,
                count_logins: user.count_logins + 1
            })
            .then(function(none) {
                res.send({msg: 'update successful'});
            }).catch(next);
        }
    }).catch(next);
});

// update first / last names and phone number
router.put('/update-contact', function(req, res, next) {
    let data = req.body;
    let fbDB = req.app.get('fb-db');

    let uid = data.uid,
        updatedInfo = data.updatedInfo;

    // update user contact info in db
    dbCalls.update_user_contact(fbDB, uid, updatedInfo)
    .then(function(none) {
        res.send({msg: 'update succesful'});
    }).catch(next);
});

// sign in / try to create user
router.post('/create-user', function(req, res, next) {
    res.send({woot: "create user!"})
});

// log out user, redirect?
router.put('/logout', function(req, res, next) {
    res.send({woot: "logout!"});
});

module.exports = router;