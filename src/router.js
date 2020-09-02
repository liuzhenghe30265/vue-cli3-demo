import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

Vue.use(Router)

let routers = [{
    path: '/login',
    component: () => import('./views/login/index.vue'),
    meta: {
      // 是否使用公用布局（登录页不需要导航）
      commonLayout: false
    },
  },
  {
    path: '/404',
    component: () => import('./views/404.vue'),
    meta: {
      commonLayout: false
    },
  },
  {
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
  {
    path: '*',
    redirect: '/404', // 如果页面不存在，重定向到 404 页面
  },
]
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers,
})
const whiteList = ['/login'] // 不需要重定向的页
router.beforeEach((to, form, next) => {
  // to 即将要进入路由的对象
  // from 要离开的路由对象
  // 调用 next() 方法，进入下一个路由
  let token = ''
  try {
    let userInfo = JSON.parse(sessionStorage.userInfo)
    // 防止刷新页面 vuex 中的用户信息清除，将 sessionStorage 中的用户信息再存储到 vuex 中
    store.dispatch('setUserInfo', userInfo)
    token = userInfo.token
  } catch (error) {
    token = ''
  }
  if (token) {
    // 如果有 token，登录成功
    if (to.path === '/login') {
      // 访问登录页，就重定向到首页
      next({
        path: '/'
      })
    } else {
      // 访问其他页面，进入下一个路由
      next()
    }
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录页面直接登录
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router