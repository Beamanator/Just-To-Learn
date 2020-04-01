const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
    // id not needed b/c 'id' is auto created by mlab
});

// make collection "Book" with objects that look like schema
module.exports = mongoose.model("Book", bookSchema);
