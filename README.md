# 自定义指令

```
<template>
  <div id="app">
    <div v-changeColor="color">自定义指令
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.directive('changeColor', {
  bind(el, binding, vnode) {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    el.style.color = binding.value
  }
})
export default {
  name: 'App',
  data() {
    return {
      color: 'red'
    }
  }
}
</script>
```

# 自定义指令实现弹窗拖拽

## 实现思路

点击拖拽区域，记录按下鼠标的位置距浏览器窗口左侧和顶部的距离，和要拖拽的窗口距浏览器左侧和顶部的距离，移动时，记录移动的距离，并重新设置移动窗口的 left 和 top 值，值为移动的距离加原本元素距浏览器窗口左侧和顶部的距离。

![](https://upload-images.jianshu.io/upload_images/9373308-2c0d1af25d359004.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 问题

## 获取元素当前样式兼容问题

window.getComputedStyle 获取元素当前样式，只有 IE 和 Opera 支持 currentStyle

## 存在多个弹窗层级问题

初始化时层级设置为 1000，并存储为全局变量，每次点击和拖拽的时候，都给弹窗设置一次层级，并加 1，后点击或拖拽的弹窗层级就会高于前一个弹窗，保证被点击或拖拽的弹窗处于最上边。

# 代码

```
<template>
  <div id="app">
    <button @click="openModel">open
      modal</button>
    <button @click="openModel2">open
      modal2</button>
    <div v-drag>
      <div class="drag-body"
           v-show="visible.show">
        <div class="drag-close"
             @click="handleClose">
          X
        </div>
        <div class="drag-header">header
        </div>
        <div class="drag-content">
          content
        </div>
      </div>
    </div>
    <div v-drag>
      <div class="drag-body drag-body2"
           v-show="visible2.show">
        <div class="drag-close"
             @click="handleClose2">
          X
        </div>
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
let zIndex = 1000
Vue.directive('drag', {
  bind(el) {
    zIndex += 1
    const dragBody = el.querySelector('.drag-body')
    const dragHeader = el.querySelector('.drag-header')
    dragBody.style['z-index'] = zIndex
    dragBody.style['position'] = 'fixed'
    dragHeader.style['cursor'] = 'move'
    // window.getComputedStyle 获取元素当前样式，只有 IE 和 Opera 支持 currentStyle
    const currentStyle = window.getComputedStyle(dragBody, null) || dragBody.currentStyle
    dragBody.onclick = () => {
      console.log(zIndex)
      // 多个弹窗层级问题，每次点击弹窗，zIndex 加 1
      let _zIndex = zIndex ? +zIndex + 1 : +currentStyle.zIndex + 1
      zIndex = _zIndex
      dragBody.style['z-index'] = _zIndex
    }
    dragHeader.onmousedown = (e) => {
      // 点击拖拽时就增加一次层级
      let _zIndex = zIndex ? +zIndex + 1 : +currentStyle.zIndex + 1
      zIndex = _zIndex
      dragBody.style['z-index'] = _zIndex
      // 记录按下鼠标的位置距浏览器窗口可视区域的距离
      const distanceX = e.clientX
      const distanceY = e.clientY
      // 记录要托拽的窗口距浏览器左侧和顶部的距离
      // 将 px 为单位的字符串改为数值
      const styleLeft = +currentStyle.left.replace(/\px/g, '')
      const styleTop = +currentStyle.top.replace(/\px/g, '')
      document.onmousemove = (e) => {
        // 窗口移动的距离就是鼠标移动时所在的位置减去鼠标按下时距浏览器窗口左侧和顶部的距离
        const moveLeft = e.clientX - distanceX
        const moveTop = e.clientY - distanceY
        // 更新元素定位的 left 和 top 值
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
      visible: {
        show: false
      },
      visible2: {
        show: false
      },
    }
  },
  methods: {
    handleClose2() {
      this.visible2.show = false
    },
    handleClose() {
      this.visible.show = false
    },
    openModel2() {
      this.visible2.show = true
    },
    openModel() {
      this.visible.show = true
    },
  }
}
</script>
<style scoped lang="scss">
.drag-body {
  top: 50px;
  left: 10px;
  width: 400px;
  height: 600px;
  border: 1px solid;
  background: #ffffff;
  .drag-close {
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 24px;
    cursor: pointer;
  }
  .drag-header {
    padding: 20px;
    border-bottom: 1px solid;
  }
  .drag-content {
    padding: 20px;
  }
}
.drag-body2 {
  top: 100px;
  left: 50px;
}
</style>
```
