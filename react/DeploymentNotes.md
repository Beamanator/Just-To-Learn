## Steps for deployment of SPAs
1. Check (& adjust) basepath
    - `<BrowserRouter basename="/my-app/">`
    - only when using React Router
    - required if app is served from something other than route domain
        - ex: serving app from example.com/my-app
2. Build & Optimize Project
    - done with 1 command - `rpm run build` -> in create-react-app project
    - bundles code base into smallest package to upload to server
3. Server must **ALWAYS** serve `index.html` (even in 404 cases)
    - all routes are handled in react app :)
4. Upload Build Artifacts (from 2nd step) to *static* Server
    - AWS s3, Github Pages, Firebase = all static servers
        - Github Pages / blogs to check out:
            - https://www.youtube.com/watch?v=7yA7BGos2KQ
            - https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d
            - https://github.com/gitname/react-gh-pages
            - https://medium.com/@_mariacheline/deploy-create-react-app-project-to-github-pages-2eb6deda5b89
    - build artifacts folder, not entire project
    - stored in `/build` folder when using create-react-app
        - **Note** `/build` folder appears in same directory as your project