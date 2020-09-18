<template>
  <div class="app-wrapper">
    <sidebar
             class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  },
}
</script>

<style lang="scss">
.sidebar-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  z-index: 9;
  .el-menu-item,
  .el-submenu__title {
    text-align: left;
  }
}
.main-container {
  text-align: center;
}
</style>
