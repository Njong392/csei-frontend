import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/member/Dashboard.vue";
import Biography from "@/pages/member/Biography.vue";
import Login from "@/pages/auth/Login.vue";
import Prospect from "@/pages/prospect/Prospect.vue";
import ResetEmail from "@/pages/auth/ResetEmail.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";
import NotFound from "@/pages/error/NotFound.vue";
import ProspectApplicationTable from "@/pages/admin/ProspectApplicationTable.vue";
import { useAuthStore } from "@/stores/UserAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/biography",
      name: "biography",
      component: Biography,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/prospect-applications",
      name: "prospect-applications",
      component: ProspectApplicationTable,
      meta: {
        requiresAuth: true,
        roles: ["admin"]
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/prospect",
      name: "prospect",
      component: Prospect,
    },
    {
      path: "/request-reset",
      name: "request-reset",
      component: ResetEmail,
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      component: ResetPassword,
    },
    {
      path: "/404",
      name: "not-found",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.isAuthResolved) {
    await auth.checkAuth();
  }

  if (to.path === "/") {
    if (auth.isAuthenticated) {
      return next("/dashboard");
    } else {
      return next("/login");
    }
  }

  if (auth.isAuthenticated && to.path === "/login") {
    return next("/dashboard");
  }

  if (to.path === "/prospect" && !to.query.referralId) {
    return next("/404");
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    auth.returnUrl = to.fullPath;
    return next("/login");
  }

  // role based access for admin routes
  if(to.meta.roles && (!auth.user || !to.meta.roles.includes(auth.user.role))){
    return next("/404");
  }

  return next();
});

export default router;
