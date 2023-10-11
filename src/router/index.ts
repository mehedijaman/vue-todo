import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import Todo from "../views/Todo.vue";
import Completed from "../views/Completed.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import authStore from "../store/authStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/todo",
    name: "todo",
    component: Todo,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/completed",
    name: "completed",
    component: Completed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const auth = authStore();

    if (to.meta.requiresAuth && Boolean(auth.isAuthenticated) != true) {
      next("/login");
    } else {
      next();
    }
  }
);

export default router;
