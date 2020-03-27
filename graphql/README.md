# GraphQL

## Resources:

-   [Net Ninja Tutorial](https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f)

## Why GraphQL?

More flexible than a restful api approach

### Example RESTful api:

Endpoint for getting data about a book:

-   `domain.com/books/:id`
-   data returned: title, genre, reviews, authorId

Endpoint for getting data about an author:

-   `domain.com/authors/:id`
-   data returned: name, age, biography, bookIds

What if now you want to get data from all books that author has written? Starting to see many different requests to these apis to get all the data we want.

### Example GraphQL query:

This how you could get all of that data in one simple request

```
{
    book(id: 123) {
        title
        genre
        reviews
        author {
            name
            bio
            books {
                name
            }
        }
    }
}
```
