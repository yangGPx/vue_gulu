<template>
  <div class="grid-row" :style="gutterToMargin">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'GuluGridRow',
  props:{
    gutter:{
      type:[Number, String]
    }
  },
  computed: {
    gutterToMargin() {
      const { gutter } = this;
      return gutter && {marginLeft: `-${gutter/2}px`,marginRight:`-${gutter/2}px`}
    }
  },
  mounted(){
    this.$children.map( item => {
      item.gutter = this.gutter;
    });
  }
}
</script>
<style lang="scss">
  .grid-row{
    display: flex;
    background: #eee;
    flex-wrap: wrap;
  }
</style>