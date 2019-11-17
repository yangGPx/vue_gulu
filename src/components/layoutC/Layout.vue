<template>
  <div class="grid-layout" :class="rowClass">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'GridLayout',
  data(){
    return {
      rowClass:{
        hasSlider:false,
      }
    }
  },
  mounted(){
    this.$children.forEach( rm => {
      if (rm.$options.name === 'LayoutSlider') {
        this.rowClass.hasSlider = true;
      }
    });
  }
}
</script>
<style lang="scss">
  .grid-layout{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &.hasSlider{
      flex-direction: row;
    }
  }
</style>