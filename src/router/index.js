import {
    createRouter,
    createWebHistory,
} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/insurance/:channel/:id",
            name: "insurance",
            component: () => import("@/views/zaInsurance.vue"),
        },
        {
            path: "/insurance/404",
            name: "404",
            component: () => import("@/views/404.vue"),
        }
    ],
});


export default router;
