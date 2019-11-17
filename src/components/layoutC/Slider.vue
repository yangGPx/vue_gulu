<template>
<transition name="slider">
  <div class="grid-slider" v-if="show">
    <slot></slot>
    <button @click="show = false">点击隐藏</button>
  </div>
</transition>

</template>
<script>
export default {
  name:'LayoutSlider',
  data(){
    return {
      show: true
    }
  },
}
</script>
<style lang="scss" scoped>
  .grid-slider{
    position: relative;
    &>button{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
.slider-enter-active,.slider-leave-active{
  transition: all 0.5s;
}
.slider-enter,.slider-leave-to{
  margin-left: -200px;
}
</style>