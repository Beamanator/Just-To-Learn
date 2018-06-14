## How Authentication works in SPAs (Single Page Applications)
- Some useful links:
    - [SPA Authentication in general](https://stormpath.com/blog/token-auth-spa)
    - [Firebase auth REST API](https://firebase.google.com/docs/reference/rest/auth/)
- Components
    - Application (SPA)
    - Server (Stateless, RESTful API)
- Flow
    1. SPA asks Server to authenticate a user
    2. Server responds with a Token
        - in other applications, often this is a "session" key
        - Token is usually in `json` format
    3. SPA stores token
        - not in Redux store, cuz this gets deleted upon refresh of page
        - stored in some kind of Local Storage
    4. SPA sends Token to server when requesting protected resource
        - like editing profile page

## Using Firebase Auth
- URLs for posting data (sign in with email / password, sign in... etc), visit the [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password) page.
- For common error codes, visit the same page above (Firebase Auth REST API).

## Firebase Database Rules
To give everyone access to everything, just do:
```
{
    "rules": {
        ".read": "true",
        ".write": "true"
    }
}
```
To limit access to authenicated users, use `"auth != null"`
To apply auth rules to `orders` node, do this:
```
{
    "rules": {
        "ingredients": {
            ".read": "true",
            ".write": "true"
        },
        
        "orders": {
            ".read": "auth != null",
            ".write": "auth != null"
        }
    }
}
```
To be able to filter data (based off of `userId`, for example), need to adjust rules to make certain fields indexable so Firebase can search through it. To make the `orders` node searchable / filterable by the `userId` property, add `".indexOn": ["userId"]`, like this:
```
{
    "rules": {
        ...
        
        "orders": {
            ".read": "auth != null",
            ".write": "auth != null",
            ".indexOn": ["userId"]
        }
    }
}
```
As you can probably see, it's possible to add multiple properties to be index, just add them to the array!

## Persisting state across sessions (in Local Storage)
- Save data in local storage by using `localStorage.setItem('<key>', <value>)`.
    - For example, in our app we used `localStorage.setItem('token', response.data.idToken)`
- Get data from local storage with `localStorage.getItem('<key>')`
- Remove data from local storage with `localStorage.removeItem('<key>')`

## Firebase Refresh Token
This token can be used to re-authenticate users, even after a token has expired. It's relatively safe to store this in local storage, as local storage can only be accessed by others using cross-site scripting attacks, which is very difficult in React (according to the lectures). However, the refresh token never expires, so it is slightly less secure than just letting the user login every so often.