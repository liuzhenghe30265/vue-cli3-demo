<!--
 * @Author: liuzhenghe
 * @Email: liuzhenghe@btzh.cn
 * @Date: 2020-09-01 17:51:30
 * @LastEditors: liuzhenghe
 * @LastEditTime: 2020-09-02 15:17:09
 * @Descripttion: 登录页面
-->

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