<template>
  <div class="home">
    <button
            @click="showFun">show</button>
    <fade :type="'fade'">
      <div class="box"
           v-if="this.show"></div>
    </fade>
  </div>
</template>

<script>

import fade from "@/components/TransitionComponent";

export default {
  name: 'home',
  components: {
    fade
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showFun() {
      this.show = this.show === true ? false : true
    }
  },

}
</script>

<style>
.box {
  width: 200px;
  height: 200px;
  background: #ccc;
}
</style>
