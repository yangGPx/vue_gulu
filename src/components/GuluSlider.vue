<template>
  <div class="slider" 
    @mouseenter="pause"
    @mouseleave="play">
    <div class="window" ref="sliderWrap" 
      :style="{ height: `${height}px`}"
      @touchstart="touchStart"
      @touchend="touchEnd">
      <slot></slot>
    </div>
    <ul class="directives" >
      <li v-for="n in dirctivesCount" :key="n" 
        :class="{active: activeIndex == n-1}"
        @click="changeSelected(n-1)">
        {{n}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'GuluSlider',
  props:{
    selected: String,
    reverse: {
      type: Boolean,
      default: false, 
    },
    height: {
      type: String|Number,
    }
  },
  data(){
    return {
      timerId: undefined,
      dirctivesCount: 0,
      activeIndex: 0,
      oldIndex: 0,
      touchStartPosition: null,
    }
  },
  methods: {
    getSelected() {
      const first = this.$children[0];
      return this.selected || first.name;
    },
    updateChildSelected() {
      let { reverse: r, oldIndex, activeIndex } = this;
      if (!this.timerId) {
        r = oldIndex > activeIndex;
      }
      r = (oldIndex === this.dirctivesCount -1 && activeIndex === 0) 
          ? false
          : r;
      r = (activeIndex === this.dirctivesCount -1 && oldIndex === 0) 
          ? true
          : r;
      this.$children.forEach( (item, index) => {
        item.reverse = r;
        this.$nextTick(() => {
          item.selected = this.names[this.activeIndex];
        })
      });
    },
    change() {
      if (this.timerId) return;
      let run = () => {
        let index = this.names.indexOf(this.selected);
        if (this.reverse) {
          if (index  <= 0 ) { index = this.names.length; }
          this.$emit('update:selected', this.names[index - 1]);
        } else {
          if (index  >= this.names.length -1 ) { index = -1; }
          this.$emit('update:selected', this.names[index + 1]);
        }
        this.activeIndex = this.names.indexOf(this.selected);
        this.timerId = setTimeout(() => { run() },2000);
      }
      run();
    },
    pause() {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    },
    play() {
      this.change();
    },
    changeSelected(n) {
      this.oldIndex = this.activeIndex;
      if (n > this.dirctivesCount - 1) {
        n = 0;
      }
      if (n <= -1) {
        n = this.dirctivesCount - 1;
      }
      console.log(n)
      this.activeIndex = n;
    },
    touchStart(e) {
      this.touchStartPosition = e.targetTouches[0];
      this.pause();
    },
    touchEnd(e) {
      const end = e.changedTouches[0];
      const { touchStartPosition:start } =  this;
      let distanceX = end.clientX - start.clientX;
      let distanceY = end.clientY - start.clientY;
      let z = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      let rate = z / Math.abs(distanceY);
      if (rate > 2) {
        if (distanceX > 10) {
          this.changeSelected(this.activeIndex - 1)
        } else if(distanceX < -10) {
          this.changeSelected(this.activeIndex + 1)
        }
      }
    },
  },
  computed: {
    names() {
      return this.$children.map( vm => vm.name );
    }
  },
  updated() {
    this.updateChildSelected();
  },
  mounted() {
    this.updateChildSelected();
    this.change();
    this.activeIndex = this.names.indexOf(this.selected);
    this.dirctivesCount =  this.$children.length;
  },
}
</script>
<style lang="scss" scoped>
  .slider{
    display: block;border: 1px solid yellow;
    .window{
      display: flex;position: relative;overflow: hidden;height: 100px;
    }
    .directives{
      display: flex;justify-content: center;align-items: center;
      &>li{
        padding: 5px 6px;color: #eee;margin: 2px;background: rgba(0,0,0,0.2);cursor: pointer;
        &.active{
          background: pink;color: #fff;
        }
      }

    }
  }
</style>