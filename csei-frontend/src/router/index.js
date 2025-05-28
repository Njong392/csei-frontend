import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/member/Dashboard.vue";
import Biography from "@/pages/member/Biography.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
        },
        {
            path: "/biography",
            name: "biography",
            component: Biography,
        }
    ]
})

export default router