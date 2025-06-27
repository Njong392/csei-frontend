import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/member/Dashboard.vue";
import Biography from "@/pages/member/Biography.vue";
import Login from "@/pages/auth/Login.vue";
import { useAuthStore } from "@/stores/UserAuth";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/biography",
            name: "biography",
            component: Biography,
            meta: {
                requiresAuth: true
            }

        },
        {
            path: "/login",
            name: "login",
            component: Login
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    if (!auth.isAuthResolved) {
      await auth.checkAuth();
    }

    if (auth.isAuthenticated && to.path === '/login'){
        return next('/dashboard')
    }

    if(to.meta.requiresAuth && !auth.isAuthenticated){
        auth.returnUrl = to.fullPath
        return next('/login')
    }

    next()
})

export default router