const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// add graphql middleware for express to be able
// -> to handl graphql queries
// also NEED to pass a schema in options
app.use(
    "/graphql",
    graphqlHTTP({
        schema
    })
);

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
