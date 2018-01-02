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
    let currentDateString = utils.get_current_date_string();

    // get this user's data
    dbCalls.get_user(fbDB, uid)
    .then(function(user) {
        // if no user found, create one!
        if (!user) {
            dbCalls.create_user(fbDB, uid, {
                last_login: currentDateString
            })
            .then(function(none) {
                res.send({msg: 'created successfully'});
            }).catch(next);
        }

        // else, user found so update last login & login count IFF different day.!
        else {
            let currentDate = new Date(currentDateString);
            let lastLogin = new Date(user.last_login);

            // if this is first time user logged in on this day, update data
            if (currentDate.getTime() > lastLogin.getTime()) {
                dbCalls.update_user_login(fbDB, uid, {
                    last_login: currentDateString,
                    count_logins: user.count_logins + 1
                })
                .then(function(none) {
                    res.send({msg: 'update successful'});
                }).catch(next);
            }

            // else, user already logged in today
            else if (currentDate.getTime() === lastLogin.getTime()){
                res.send({msg: 'no user update required'});
            }

            // else, this login is BEFORE last login - HOW? No update, just return message
            else {
                res.send({
                    msg: `today [${currentDateString}] < last login [${user.last_login}]??`
                })
            }
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