<template>
<div class="wrapper" :class="classList">
  <div class="toast" ref="wrap">
    <div class="message">
      <div v-if="enableHtml" v-html="$slots.default[0]"></div>
      <slot v-else></slot>
    </div>
    <div class="line" v-if="closeButton" ref="line"></div>
    <span v-if="closeButton" class="close-btn" @click="closeFn">{{closeButton.text || 'ok'}}</span>
  </div>
</div>

</template>
<script>
import Vue from 'vue'
export default {
  props:{
    autoClose:{
      type: Boolean,
      default: true
    },
    autoCloseDelay:{
      type: Number,
      default: 2
    },
    closeButton:{
      type: Object,
      default(){
        return{
          text:'ok',
          callback:undefined
        }
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom',
      validator(value){
        // 这里不用includes的原因是为了增加组件对浏览器的兼容性
        return ['top', 'middle', 'bottom'].indexOf(value) >= 0;
      }
    }
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseDelay * 1000);
    }
    this.$nextTick(function(){
      this.$refs.line.style.height = 
        `${this.$refs.wrap.getBoundingClientRect().height}px`;
    })
  },
  methods: {
    close(){
      this.$el.remove();
      this.$emit('close');
      this.$destroy();
    },
    closeFn(){
      if (typeof this.closeButton.callback === 'function') {
        this.closeButton.callback();
      }
      this.close();
    }
  },
  computed: {
    classList() {
      return [`position-${this.position}`]
    }
  }
}
</script>
<style lang="scss" scpoed>
@keyframes slide-up {
  0% { transform: translateY(100%); };
  100%{ transform: translateY(0); };
}
@keyframes slide-down {
  0% { transform: translateY(-100%); };
  100%{ transform: translateY(0); };
}
@keyframes fade-in {
  0% { opacity: 0; };
  100%{ opacity: 1; };
}
.wrapper{
  position: fixed;
  left: 50%;
  $animation-duration: 1s;
  &.position-top{
    top: 0;
    animation: slide-down $animation-duration;
    .toast{border-top-left-radius: 0;border-top-right-radius: 0;}
  }
  &.position-middle{
    top: 50%;
    transform: translateY(-50%);
    animation: fade-in $animation-duration;
  }
  &.position-botdom{
    bottom: 0;
    animation: slide-up $animation-duration;
    .toast{border-bottom-left-radius: 0;border-bottom-right-radius: 0;}
  }
  .toast{
  display: flex;color: #fff;background: rgba(0,0,0,.2);min-height: 40px;
  border-radius: 3px;padding: 0 10px;align-items: center;font-size: 14px;
  justify-content: space-between;
  transform: translateX(-50%);
  .close-btn{
    cursor: pointer;
    flex-shrink: 0;
  }
  .line{
    width: 1px;
    margin: 0 10px;
    background: #eee;
  }
}
}


</style>