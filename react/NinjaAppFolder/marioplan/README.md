# mariplan app
Note: This was created while following the "React, Redux & Firebase App" tutorial series by The Net Ninja

Link here:  https://www.youtube.com/watch?v=r5b0spRlnlU

# Steps to achieving success:
1. Where to start
    - Use `create-react-app` to make a blank React application
        - Example: `npx create-react-app mariplan` (this is what I used for the `mariplan` app)
        - Note: I had to do `npm cache clean --force`, which was recommended on some github issues & stack overflow q's
2. Plan out components
    - App (root)
        - Nav (show all links)
            - Signed in Links
            - Signed out Links
        - Dashboard (`/dashboard` or `/`)
            - Project List (list out all projects on left-hand side)
            - Notifications (notification panel on the right)
        - Project Details (`/project/:id`)
        - Create Project (`/create`)
        - Sign in (`/signin`)
        - Sign up (`/signup`)