<template>
<transition name="slider">
  <div class="g-slider-item" :class="{reverse}" v-if="visiable">
    <slot></slot>
  </div>
</transition>
</template>
<script>
export default {
  name: 'GuluSliderItem',
  props: {
    name: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      selected: '',
      reverse: '',
    }
  },
  computed: {
    visiable() {
      return this.selected === this.name;
    }
  },
}
</script>
<style lang="scss" scoped>
  .g-slider-item{
    width: 100%;
    height: 100%;
    border: 1px solid red;
    flex-shrink: 0;
  }
  .slider-enter{
    transform: translateX(100%) scale(0.7);
  }
  .slider-leave-to{
    transform: translateX(-100%) scale(0.7);position: absolute;
  }
  .slider-enter.reverse{
    transform: translateX(-100%) scale(0.7);
  }
  .slider-leave-to.reverse{
    transform: translateX(100%) scale(0.7);position: absolute;
  }
  .slider-enter-active,
  .slider-leave-active{
    transition: all 800ms;
  }
</style>