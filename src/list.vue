<template>
  <div>
    <div class="children"
         v-for="item of list"
         :key="item.name">
      {{item.name}}
      <list :list="item.children">
      </list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  props: {
    list: {
      type: Array
    }
  },
}
</script>