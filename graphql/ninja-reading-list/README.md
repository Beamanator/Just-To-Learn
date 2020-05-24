# Ninja Reading List

Stack:

Server:

-   GraphQL, NodeJs & Express
    -   How graphs look and relationships between items
    -   Entry points into the graph and what info can be retrieved from graph

Database:

-   MongoDB database (mLab)

Client (front-end):

-   Reactjs
-   Apollo - glue between graphQL and React

Other tools:

-   Graphiql
    -   Tool for previewing requests from front-end

## Notes:

-   `nodemon`
    -   `npm install nodemon -g`, run with `nodemon app` to have node server restart whenever you make changes to the app
-   Tasks for defining graphql schemas:
    1. Define types
    1. Define relationships between types
    1. Define root queries (where users jump into the graph)
-   To use `graphiql` to test your queries, just add `graphiql: true` in the express middleware!
    -   Then your route will automatically show the graphiql page, where you can run test queries & even navigate your map on the right-hand side (Documentation explorer)
-   Database in this tutorial is mLab, part of mongodb
    -   first, make user who can access the data
    -   then do basic connect to see if database successfully connects
-   Use `GraphQLNonNull` to make a field in a mutation required
    -   Ex: `name: { type: new GraphQLNonNull(GraphQLString) },`
