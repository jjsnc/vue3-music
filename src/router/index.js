import { createRouter, createWebHashHistory } from "vue-router";
const Recommend = () =>
  import("@/views/recommend" /* webpackChunkName: "recommend" */);
const Singer = () => import("@/views/singer" /* webpackChunkName: "singer" */);
const TopList = () =>
  import("@/views/top-list" /* webpackChunkName: "top-list" */);
const Search = () => import("@/views/search" /* webpackChunkName: "search" */);
const Album = () => import("@/views/album" /* webpackChunkName: "album" */);
const SingerDetail = () =>
  import("@/views/singer-detail" /* webpackChunkName: "singer-detail" */);

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/top-list",
    component: TopList,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
