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
