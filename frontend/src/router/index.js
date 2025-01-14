import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import Sem1 from "../views/Sem1.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Sem1,
    },
    {
      path: "/demo",
      // name: 'home',
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },

    {
      path: "/articles",
      component: () => import("../views/Articles.vue"),
    },
    {
      path: "/articles/:slug",
      component: () => import("../views/Article.vue"),
    },
  ],
});

export default router;
