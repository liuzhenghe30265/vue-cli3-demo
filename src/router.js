import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: Layout,
      visible: true,
      children: [{
        path: '/home',
        name: '首页',
        component: () => import('@/views/Home.vue'),
        visible: true,
      }]
    },
    {
      path: '/1',
      name: '一级',
      component: Layout,
      visible: true,
      children: [{
        path: '/1-1',
        name: '二级',
        component: () => import('@/views/About.vue'),
        visible: true,
        children: [{
          path: '/1-1-1',
          name: '三级',
          component: () => import('@/views/About.vue'),
          visible: true,
        }, {
          path: '/1-2-2',
          name: '三级',
          component: () => import('@/views/About2.vue'),
          visible: true,
        }]
      }, {
        path: '/1-2',
        name: '二级',
        component: () => import('@/views/About2.vue'),
        visible: true,
      }]
    },
  ]
})