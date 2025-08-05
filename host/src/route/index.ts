import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import DemoView from "../views/DemoView.vue"
import { routesConfig } from "./config"
export const routes: RouteRecordRaw[] = [
  {
    path: "/demo/:name",
    component: DemoView,
    props: true,
  },
  ...routesConfig.map((item) => {
    return {
      path: item.path,
      component: DemoView,
      props: true,
      name: item.name,
      meta: {
        name: item.name,
      },
    } as RouteRecordRaw
  }),
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
