<template>
  <div class="grid-content">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'LayoutContent',
}
</script>
<style lang="scss" scoped>
  .grid-content{
    flex-grow: 1;
  }
</style>