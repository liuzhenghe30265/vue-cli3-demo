<template>
  <div class="home">
    <h1 ref="demo"
        class="demo"
        style="border:1px solid #dedede">
      Hello!</h1>
    <img :src="picUrl"
         alt="">
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'home',
  data() {
    return {
      picUrl: ''
    }
  },
  mounted() {
    this.makePictureFun()
  },
  methods: {
    makePictureFun() {
      this.$nextTick(async () => {
        const picture = await this.htmlToCanvasFun()
        this.picUrl = picture
      })
    },
    htmlToCanvasFun() {
      const DOM = this.$refs.demo
      return html2canvas(DOM).then(canvas => {
        return canvas.toDataURL('image/png')
      })
    }
  },

}
</script>

<style>
</style>
