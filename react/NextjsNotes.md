## [Next.js](https://github.com/zeit/next.js/)
"A minimalistic framework for server-rendered React applications"
a.k.a. server pre-renders page, and returns that to the client.
This can be useful if you want your website to be search-engine crawlable, because the server will return a rendered page for the initial page request, unlike non-SSR applications.

Note: Nextjs only works for React 16, as of right now ;)

We don't use React-Router anymore, just folders and files to reflect URLs in the file system. Next will automatically parse this to figure out links. On the way, it pre-renders and lazy loads the pages without any extra setup.

## My thoughts
I haven't looked into Next.js in depth, but it seems to make things pretty easy getting started. Code splitting (lazy loading) is super simple, Links look pretty easy, css modules - ish stuff is super simple and pretty much ready to go out of the box. However, the one reason I didn't follow this lecture super in detail is, as i expected - the code requires a server to be running node.js, unlike the basic setup (using create-react-app).