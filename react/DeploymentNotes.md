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
    - Awss3, Github Pages, Firebase = all static servers
    - build artifacts folder, not entire project
    - stored in `/build` folter when using create-react-app