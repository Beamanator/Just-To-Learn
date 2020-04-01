const graphql = require("graphql");
const _ = require("lodash");

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = graphql;

// dummy data
const books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
    { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
    { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
    { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];
const authors = [
    { name: "someone", age: 35, id: "1" },
    { name: "auth 2", age: 32, id: "2" },
    { name: "the third person", age: 65, id: "3" }
];

const BookType = new GraphQLObjectType({
    name: "Book",
    // Note: wrapped in a function for relational fields
    // -> Reference to AuthorType needed!
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
    // Note: wrapped in a function for relational fields
    // -> Reference to BookType needed!
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            // list of booktypes
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
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
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});