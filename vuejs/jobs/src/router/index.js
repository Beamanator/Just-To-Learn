import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Jobs from "../views/jobs/Jobs.vue";
import JobDetails from "../views/jobs/JobDetails.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // https://next.router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/jobs",
        name: "Jobs",
        component: Jobs,
    },
    {
        path: "/jobs/:id",
        name: "JobDetails",
        component: JobDetails,
        // can accept route params as props
        props: true,
    },
    // redirect (ex: old routes to new routes)
    {
        path: "/all-jobs",
        redirect: "/jobs",
    },
    // catch-all 404 route
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
