const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

// dummy data
const books = [
    { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "Final fantasy", genre: "Fantasy", id: "2", authorId: "3" },
    { name: "1984", genre: "Future", id: "3", authorId: "2" }
];
const authors = [
    { name: "someone", age: 35, id: "1" },
    { name: "auth 2", age: 32, id: "2" },
    { name: "the third person", age: 65, id: "3" }
];

const BookType = new GraphQLObjectType({
    name: "Book",
    // Note: wrapped in a function for relational fields later
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                // book data that got resolved is stored in 'parent'!
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    // Note: wrapped in a function for relational fields later
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
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
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from database / other source
                // note: args.id can be used to query books with this id
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
