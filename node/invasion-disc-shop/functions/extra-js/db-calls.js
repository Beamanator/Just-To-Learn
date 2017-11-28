const discFilterFunctions = require('./disc-filter-functions');

const functions = {
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
    get_discs: function(fbDB, refLoc='') {
        const ref = fbDB.ref('disc_holder' + refLoc);

        return ref.once('value').then(snap => snap.val());
    },

    /**
     * Function gets disc-types map from firebase
     * 
     * @param {object} fbDB - single instance of firebase database from node
     * @returns - promise to disc-type map from fb
     */
    get_disc_picture_settings: function(fbDB) {
        const ref = fbDB.ref('disc_picture_settings');

        return ref.once('value').then(snap => snap.val());
    },
    get_disc_picture_map: function(fbDB) {
        const ref = fbDB.ref('disc_picture_map');

        return ref.once('value').then(snap => snap.val());
    },

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
            phone_number: 'empty',
            email_address: 'empty',
            first_name: '-',
            last_name: '-'
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
    update_user: function(fbDB, uid, settings) {
        const usersRef = fbDB.ref('user_data_holder');

        let updateObj = {};
        updateObj[`${uid}/last_login`] = settings.last_login;
        updateObj[`${uid}/count_logins`] = settings.count_logins;

        return usersRef.update(updateObj);
    }
};

module.exports = functions;