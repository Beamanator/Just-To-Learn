// allow node to read from .env file
require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to mlab database
let username = process.env.CRED_NAME;
let pword = process.env.CRED_PWORD;
mongoose.connect(
    `mongodb://${username}:${pword}@ds159509.mlab.com:59509/graphql-ninja`,
    // add these options to avoid some deprecation warnings
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
    console.log("connected to database");
});

// add graphql middleware for express to be able
// -> to handl graphql queries
// also NEED to pass a schema in options
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
