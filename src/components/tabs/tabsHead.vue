<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="action-wrap">
      <slot name="action"></slot>
    </div>
    <div class="line" ref="activeLine"></div>
  </div>
</template>
<script>
export default {
  name:'guluGridTabsHead',
  inject: ['eventBus'],
  data(){
    return {
      active: false
    }
  },
  mounted() {
    this.eventBus.$on('update.selected', (param, vm) => {
      const line = this.$refs.activeLine;
      const obj = vm.$el.getBoundingClientRect();
      const box = this.$el.getBoundingClientRect();
      line.style.width =  `${obj.width}px`; 
      line.style.left =  `${obj.left - box.left}px`;
    });
  },
}
</script>
<style lang="scss" scoped>
  .tabs-head{
    font-size: 14px;
    display: flex;
    position: relative;
    .action-wrap{
      margin-left: auto;
    }
    .line{
      width: 50px;height: 2px;background: #f83;
      position: absolute;bottom: 0;left: 0;
      transition: all .25s;
    }
  }
</style>