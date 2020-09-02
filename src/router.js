import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routers = [{
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue'),
    meta: {
      commonLayout: true
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue'),
    meta: {
      commonLayout: true
    },
  },
]
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers,
})

export default router