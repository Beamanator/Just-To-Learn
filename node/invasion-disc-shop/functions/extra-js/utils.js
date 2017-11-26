const functions = {
    /**
     * Function converts querystring to valid filter. Returns valid filter object
     * with first real filter in list
     * 
     * All available filters: (note: only nostock is different)
     * ?filtArr=
     *      all,
     *      available,
     *      doodle,
     *      nostock,
     *      team,
     *      event
     * 
     * @param {string} filterString - string of filters (usually 1 filter) delim by ','
     */
    getValidFilterObj: function(filterString) {
        let validFilterObj = {};
        
        // default filter to 'all'
        if (!filterString) return { 'all': true };

        const availableFilterArr = [
            'all',      'available',
            'doodle',  'nostock',
            'team',    'event'
        ];

        // set up variables
        let filterArr = filterString.split(',');

        // loop through query string filters
        for (let filter of filterArr) {
            filter = filter.toLowerCase();

            // if filter is valid, set true
            if (availableFilterArr.includes(filter)) {
                validFilterObj[filter] = true;
                break;
            }
        }

        return validFilterObj;
    }
};

module.exports = functions;