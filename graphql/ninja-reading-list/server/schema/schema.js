const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: "Book",
    // Note: wrapped in a function for relational fields later
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

// define points where users can jump into the graph
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            // tell graphql when someone queries 'book',
            // -> they should pass args 'id' which is a string
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // code to get data from database / other source
                // note: args.id can be used to query books with this id
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
