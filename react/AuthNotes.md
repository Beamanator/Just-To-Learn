## How Authentication works in SPAs (Single Page Applications)
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