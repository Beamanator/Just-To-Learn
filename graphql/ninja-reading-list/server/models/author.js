const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
    // id not needed b/c 'id' is auto created by mlab
});

module.exports = mongoose.model("Author", authorSchema);
