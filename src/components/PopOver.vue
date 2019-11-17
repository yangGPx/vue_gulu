<template>
  <div class="g-popover" ref="popOverWrapper">
    <div class="content" ref="content" v-if="visiable" :class="{[`position-${position}`]: true}" :style="{maxWidth: `${maxWidth}px`}">
      <slot name="content"></slot>
    </div>
    <span class="button" ref="triggerWrap">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'GuluPopOver',
  data(){
    return {
      visiable: false
    }
  },
  props:{
    position:{
      type: String,
      default: 'top',
      validator(val){
        return ['top', 'bottom', 'left', 'right'].indexOf(val) > -1;
      }
    },
    maxWidth:{
      type: Number|String,
      default: 300
    },
    trigger:{
      type: String,
      default: 'click'
    },
  },
  mounted() {
    if (this.trigger === 'click') {
      this.$refs.triggerWrap.addEventListener('click', () => {
        this.onClick()
      })
    } else if (this.trigger === 'hover') {
      this.$refs.triggerWrap.addEventListener('mouseenter', () => {
        this.open()
      });
      this.$refs.triggerWrap.addEventListener('mouseleave', () => {
        this.close()
      });
    }
  },
  methods: {
    contentPosition(){
      let {width, height, left, top} = this.$refs.triggerWrap.getBoundingClientRect();
      top += window.scrollY;left += window.scrollX;
      const positionObj = {
        top:{top:top,left:left},
        bottom:{top:top + height,left:left},
        left:{top:top,left:left},
        right:{top:top,left:left + width},
      }
      this.$refs.content.style.top = `${positionObj[this.position].top}px`; 
      this.$refs.content.style.left = `${positionObj[this.position].left}px`;
      document.body.appendChild(this.$refs.content);
      // 这里获取的 top 和 left 是相对于当前视口的,弹框的top left 是相对于body的. 就会出现偏差
      // 这里的if else 可以表驱动优化  虽然不会减少多少代码  但是会减少 逻辑代码
    },
    docClickEventHanlder() {
      this.x = (e) => {
        if (this.$refs.content &&
          (this.$refs.content.contains(e.target) || this.$refs.popOverWrapper.contains(e.target))
        ) { return; }
        this.close();
      }
      document.addEventListener('click', this.x)
    },
    close(){
      this.visiable = false;
      document.removeEventListener('click', this.x);
    },
    open(){
      this.visiable = true;
      this.$nextTick(() => {
        this.contentPosition();
        this.docClickEventHanlder();
      })
    },
    onClick(){
      if (this.$refs.triggerWrap.contains(event.target)) {
        if (this.visiable) { this.close();} 
        else { this.open(); }
      } else {
        this.close();
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .g-popover{
    margin: 150px;
    position: relative;
    overflow: hidden;
    border: 1px solid red;
    .button{
      display: inline-block;
    }
  }
  .content{
    $triWidth:10px;
    $border-color:#f83;
    position: absolute;padding: 0.5em 1em;border: 1px solid $border-color;border-radius: 3px;
    &::after,&::before{
      content: '';display: block;width: 0;height: 0;
      border: $triWidth solid transparent;position: absolute;left: 0.5em;
    }
      &.position-top{
        transform: translateY(-100%);margin-top: -$triWidth;
        &::before,&::after{
          border-bottom-width: 0;
        }
        &::before{
          border-top-color: $border-color;
          top: 100%;
        }
        &::after{
          border-top-color: #fff;
          top: calc(100% - 1px);
        }
      }
      &.position-bottom{
        margin-top: $triWidth;
        &::before,&::after{
          border-top-width: 0;
          transform: translateY(-100%)
        }
        &::before{
          border-bottom-color: $border-color;
          top: 0;
        }
        &::after{
          border-bottom-color: #fff;
          top: 1px;
        }
      }
      &.position-left{
        transform: translateX(-100%);margin-left: -10px;
        &::before,&::after{
          border-right-width: 0;
          top: 0.3em;
        }
        &::before{
          border-left-color: $border-color;
          left: 100%;
        }
        &::after{
          border-left-color: #fff;
          left:calc( 100% - 1px );
        }
      }
      &.position-right{
        margin-left: 10px;
        &::before,&::after{
          border-left-width: 0;
          top: 0.3em;transform: translateX(-100%);
        }
        &::before{
          border-right-color: $border-color;
          left: 0;
        }
        &::after{
          border-right-color: #fff;
          left: 1px;
        }
      }

  }
</style>