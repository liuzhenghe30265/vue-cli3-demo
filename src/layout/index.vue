<!--
 * @Author: liuzhenghe
 * @Email: liuzhenghe@btzh.cn
 * @Date: 2020-09-02 11:50:36
 * @LastEditors: liuzhenghe
 * @LastEditTime: 2020-09-02 15:13:49
 * @Descripttion: 布局
-->

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