<template>
  <div>
    <el-scrollbar
                  wrap-class="scrollbar-wrapper">
      <el-menu router
               :default-active="activeMenu"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose">
        <sidebar-item v-for="route in getRoutersData"
                      :key="route.path"
                      :item="route"
                      :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    getRoutersData() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
  methods: {
    handleClose() {

    },
    handleOpen() {

    }
  }
}
</script>
