const discFilterFunctions = require('./disc-filter-functions');
const utils = require('./utils');

const functions = {
    // ==================== DISC FILTERS =============================

    /**
     * Function gets discs from store based on a filter
     * 
     * @param {object} fbDB - single instance of firebase database from node
     * @param {string} filter - code describing what discs to bring back
     * @returns - array of disc objects from fb
     */
    get_discs_with_filter: function(fbDB, filterObj) {
        const ref = fbDB.ref('disc_holder');
        
        return ref.once('value').then(snap => {
            let discs = snap.val();
            let filterKey = Object.keys(filterObj)[0];

            switch ( filterKey ) {
                case 'all':
                    return discFilterFunctions.get_discs_all(discs);
                    break;
                case 'available':
                    return discFilterFunctions.get_discs_available(discs);
                    break;
                case 'doodle':
                    return discFilterFunctions.get_discs_doodle(discs);
                    break;
                case 'nostock':
                    return discFilterFunctions.get_discs_nostock(discs);
                    break;
                case 'team':
                    return discFilterFunctions.get_discs_team(discs);
                    break;
                case 'event':
                    return discFilterFunctions.get_discs_event(discs);
                    break;
                default:
                    console.error('somehow wrong filter passed:', filterKey);
                    return [];
            }
        });
    },
    get_discs: function(fbDB, discTypeRef='') {
        const ref = fbDB.ref('disc_holder' + discTypeRef);

        return ref.once('value').then(snap => snap.val());
    },

    // ====================== DISC PICTURE MAP ========================

    /**
     * Function gets disc-types map from firebase
     * 
     * @param {object} fbDB - single instance of firebase database from node
     * @param {string} discTypeRef - reference to specific disc type
     * @returns - promise to disc-type map from fb
     */
    get_disc_picture_map: function(fbDB, discTypeRef='') {
        const ref = fbDB.ref('disc_picture_map' + discTypeRef);

        return ref.once('value').then(snap => snap.val());
    },

    // ============================= AUTH =============================

    /**
     * Function gets data from specific user
     * 
     * @param {object} fbDB - single instance of firebase app from node
     * @param {string} uid - unique firebase id of user
     * @returns - promise with all data of specific user
     */
    get_user: function(fbDB, uid) {
        const usersRef = fbDB.ref('user_data_holder');

        // if no user found, still follows .then() path, not .catch()
        return usersRef.child(uid).once('value').then(snap => snap.val());
    },
    /**
     * Function creates a new user in user_data_holder
     * 
     * @param {object} fbDB - see above
     * @param {string} uid - see above
     * @param {object} settings - settings object to store to fb
     * @returns - promise with no user data, just basic callback
     */
    create_user: function(fbDB, uid, settings) {
        const usersRef = fbDB.ref('user_data_holder');

        let updateObj = {};
        updateObj[uid] = {
            first_login: settings.last_login,
            last_login: settings.last_login,
            count_logins: 1,
            phone_number: '',
            first_name: '',
            last_name: ''
        };

        return usersRef.update(updateObj);
    },
    /**
     * Function updates last login & login count for specified user
     * 
     * @param {object} fbDB - see above
     * @param {string} uid - see above
     * @param {object} settings - see above
     * @returns - see above
     */
    update_user_login: function(fbDB, uid, settings) {
        const usersRef = fbDB.ref('user_data_holder');

        // TODO: maybe - if fields are empty, create them
        // ex: last_name, first_name, phone, etc...

        let updateObj = {};
        updateObj[`${uid}/last_login`] = settings.last_login;
        updateObj[`${uid}/count_logins`] = settings.count_logins;

        return usersRef.update(updateObj);
    },
    /**
     * Function updates user contact information for specified user
     * 
     * @param {object} fbDB - see above
     * @param {string} uid - see above
     * @param {object} settings - see above
     * @returns - see above
     */
    update_user_contact: function(fbDB, uid, settings) {
        const usersRef = fbDB.ref('user_data_holder');

        let updateObj = {};
        updateObj[`${uid}/first_name`] = settings.firstName;
        updateObj[`${uid}/last_name`] = settings.lastName;
        updateObj[`${uid}/phone_number`] = settings.phoneNumber;

        return usersRef.update(updateObj);
    },

    // ========================= DISC RESERVE ===========================

    /**
     * Function takes care of disc reserving :D
     * 
     * @param {object} fbDB - see above 
     * @param {string} uid - see above
     * @param {string} discType - see above
     * @returns 
     */
    store_disc_reserve: function(fbDB, uid, discType) {
        const dbRef = fbDB.ref('/');

        let updateObj = {};
        updateObj[`user_data_holder/${uid}/discs_reserved/${discType}`]
            = utils.get_current_date_string();
        updateObj[`disc_reserved_holder/${discType}/users/${uid}`]
            = utils.get_current_date_string();

        // TODO: update reserve details in disc_holder node
        // -> new node: number_reserved?

        return dbRef.update(updateObj);
    },
    get_disc_reserved_holder: function(fbDB) {
        const ref = fbDB.ref('disc_reserved_holder');
        
        return ref.once('value').then(snap => snap.val());
    },
    // Function removes disc reserve details from db
    remove_disc_reservation: function(fbDB, uid, discType) {
        const dbRef = fbDB.ref('/');

        // Note: setting nodes to empty ('') DOES NOT DELETE the node in FB
        // instead, set the nodes to null to delete
        let updateObj = {};
        updateObj[`user_data_holder/${uid}/discs_reserved/${discType}`] = null;
        updateObj[`disc_reserved_holder/${discType}/users/${uid}`] = null;

        return dbRef.update(updateObj);
    },
    // get discs reserved by a user
    get_discs_reserved_by_user: function(fbDB, uid) {
        const userRef = fbDB.ref(`user_data_holder/${uid}`);

        return userRef.child('discs_reserved')
            .once('value').then(snap => snap.val());
    }
};

module.exports = functions;