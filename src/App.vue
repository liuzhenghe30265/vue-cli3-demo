<template>
  <div id="app">
    <section>
      <h3>JavaScript</h3>
      <div id="list"></div>
    </section>
    <section>
      <h3>Vue.js</h3>
      <div class="li"
           v-for="item of treeData"
           :key="item.name">
        {{item.name}}
        <div class="children">
          <list :list="item.children">
          </list>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import list from './list'
export default {
  components: {
    list
  },
  data() {
    return {
      domArr: [],
      treeData: [
        {
          name: "1",
          children: [
            {
              name: "1-1",
              children: [
                { name: "1-1-1" },
                { name: "1-1-2" },
              ]
            },
            { name: "1-2" },
          ],
        },
        { name: "2" },
        {
          name: "3",
          children: [
            {
              name: "3-1",
              children: [
                {
                  name: "3-1-1",
                  children: [
                    { name: "3-1-1-1" },
                    { name: "3-1-1-2" },
                  ]
                },
                { name: "3-1-2" },
              ],
            },
            {
              name: "3-2",
              children: [
                { name: "3-2-1" },
                { name: "3-2-2" },
              ],
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.recursionFun(this.treeData)
    let listDom = document.getElementById('list')
    listDom.innerHTML = '<div>' + this.domArr.join("") + '</div>'
  },
  methods: {
    recursionFun(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          this.domArr.push('<div class="li">' + data[i].name + '</div><div class="children">')
          this.recursionFun(data[i].children, data[i].name)
          this.domArr.push('</div></div>')
        } else {
          this.domArr.push('<div class="li"> ' + data[i].name + ' </div>')
        }
      }
    },
  },
}
</script>

<style lang="scss">
section {
  width: 50%;
  float: left;
}
.children {
  padding-left: 10px;
}
</style>
