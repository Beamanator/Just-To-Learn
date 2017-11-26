functions = {
    
    get_discs_all: function(discs) {
        // no filtering, just return all discs
        return discs;
    },

    get_discs_available: function(discs) {
        let filteredDiscs = {};

        Object.keys(discs).forEach(function(key, index) {
            let disc = discs[key];
            if (disc.stock && disc.stock > 0)
                filteredDiscs[key] = disc;
        });

        return filteredDiscs;
    },
    
    get_discs_nostock: function(discs) {
        let filteredDiscs = {};
        
        Object.keys(discs).forEach(function(key, index) {
            let disc = discs[key];
            // if disc has property 'stock' and stock is 0, add to returned discs
            if (disc.stock !== undefined && disc.stock === 0)
                filteredDiscs[key] = disc;
        });

        return filteredDiscs;
    },

    get_discs_doodle: function(discs) {
        let filteredDiscs = {};
        
        Object.keys(discs).forEach(function(key, index) {
            let disc = discs[key];
            // if disc has category 'doodle', add to returned discs
            if (disc.category && disc.category === 'doodle')
                filteredDiscs[key] = disc;
        });

        return filteredDiscs;
    },
    
    get_discs_team: function(discs) {
        let filteredDiscs = {};
        
        Object.keys(discs).forEach(function(key, index) {
            let disc = discs[key];
            // if disc has category 'team', add to retured discs
            if (disc.category && disc.category === 'team')
                filteredDiscs[key] = disc;
        });

        return filteredDiscs;
    },
    
    get_discs_event: function(discs) {
        let filteredDiscs = {};
        
        Object.keys(discs).forEach(function(key, index) {
            let disc = discs[key];
            // if disc has category 'event', add to returned discs
            if (disc.category && disc.category === 'event')
                filteredDiscs[key] = disc;
        });

        return filteredDiscs;
    }
};

module.exports = functions;