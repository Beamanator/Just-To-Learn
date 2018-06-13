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