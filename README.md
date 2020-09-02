# Vue.js登入登出功能

### 登录页面 

login.vue
```
<template>
  <div class="login">
    <input type="text"
           placeholder="用户名"
           v-model="loginForm.username">
    <input type="text"
           placeholder="密码"
           v-model="loginForm.password">
    <input type="button"
           value="登录"
           @click="handleLogin">
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      }
    }
  },
  methods: {
    handleLogin() {
      this.$nextTick(() => {
        // 模拟登录接口请求成功返回用户信息，存储到 vuex 中
        let userInfo = {
          name: this.loginForm.username,
          password: this.loginForm.password,
          token: 'usertoken',
        }
        this.$store.dispatch('setUserInfo', userInfo).then(() => {
          this.$router.push('/')
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
```

### vuex

store.js
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}, // 登录成功后的用户信息
  },
  mutations: {
    // 用户注销
    loginOut(state) {
      state.userInfo = {}
      sessionStorage.userInfo = {}
    },
    // 用户登录
    setUserInfo(state, data) {
      state.userInfo = data
      // 将登录的用户信息存储一份到 sessionStorage，sessionStorage 不能存储对象，转为字符串存储
      sessionStorage.userInfo = JSON.stringify(data)
    },
  },
  actions: {
    // 用户注销
    loginOut(ctx) {
      ctx.commit('loginOut')
    },
    // 用户登录
    setUserInfo(ctx, data) {
      ctx.commit('setUserInfo', data)
    },
  }
})
```


### 路由配置

router.js
```
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
```


### 用户信息和注销

layout.vue
```
<template>
  <div class="layout">
    <header>
      <router-link to="/">Home
      </router-link> |
      <router-link to="/about">About
      </router-link>
      <span>用户：{{$store.state.userInfo.name}}</span>
      <button
              @click="handleLoginout">注销</button>
    </header>
  </div>
</template>
<script>
export default {
  name: 'layout',
  methods: {
    handleLoginout() {
      this.$store.dispatch('loginOut').then(() => {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
```


### 入口页面

App.js
```
<template>
  <div id="app">
    <layout
            v-if="$route.meta.commonLayout">
    </layout>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import layout from '@/layout/index'
export default {
  components: {
    layout,
  },
}
</script>

<style lang="scss">
#app {
  text-align: center;
}
</style>
```