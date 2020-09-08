<template>
  <div id="app">
    <div v-drag>
      <div class="drag-body">
        <div class="drag-header">header
        </div>
        <div class="drag-content">
          content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.directive('drag', {
  // eslint-disable-next-line no-unused-vars
  bind(el, binding, vnode) {
    const dragBody = el.querySelector('.drag-body')
    const dragHeader = el.querySelector('.drag-header')
    dragHeader.style['cursor'] = 'move'
    // window.getComputedStyle 获取元素当前样式，只有 IE 和 Opera 支持 currentStyle
    const currentStyle = dragBody.currentStyle || window.getComputedStyle(dragBody, null)
    dragHeader.onmousedown = (e) => {
      // 计算按下鼠标的位置据窗口可视区域的距离
      const distanceX = e.clientX - dragHeader.offsetLeft
      const distanceY = e.clientY - dragHeader.offsetTop
      // 将 px 为单位的字符串改为数值
      const styleLeft = +currentStyle.left.replace(/\px/g, '')
      const styleTop = +currentStyle.top.replace(/\px/g, '')
      document.onmousemove = (e) => {
        // 移动的距离
        const moveLeft = e.clientX - distanceX
        const moveTop = e.clientY - distanceY
        // 移动当前元素
        dragBody.style.left = `${moveLeft + styleLeft}px`
        dragBody.style.top = `${moveTop + styleTop}px`
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
export default {
  name: 'App',
  data() {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
.drag-body {
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 600px;
  border: 1px solid;
  .drag-header {
    padding: 20px;
    border: 1px solid;
  }
  .drag-content {
    padding: 20px;
  }
}
</style>
