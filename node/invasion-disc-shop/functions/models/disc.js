const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// geoJson documentation: http://geojson.org/

// geoschema not needed for discs, I think
// const GeoSchema = new Schema({
//     type: {
//         type: String,
//         default: "Point"
//     },
//     coordinates: {
//         type: [Number],
//         index: "2dsphere" //-> type of map we want to use
//     }
// });

// create ninja Schema & model
const DiscSchema = new Schema({
    author: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Disc Description is required']
    },
    stock: {
        type: Number,
        default: 0
    },
    total_purchased: {
        type: Number,
        default: 0
    },
    picture_code: {
        type: String,
        default: 'None'
    },
    price: {
        type: Number,
        required: [true, 'Disc Price is required']
    }
    // geometry: GeoSchema
});

const Disc = mongoose.model('disc', DiscSchema);

module.exports = Disc;
