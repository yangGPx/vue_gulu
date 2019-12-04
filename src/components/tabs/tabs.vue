<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name:'GuluTabs',
  data(){
    return {
      eventBus: new Vue(),
    }
  },
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  created() {
    this.eventBus.$on('update.selected', (param) => {
      this.$emit('update.selected', param);
    });
  },
  mounted() {
    this.initDefault();
  },
  provide(){
    return{
      eventBus: this.eventBus,
    }
  },
  methods: {
    initDefault() {
      this.$children.forEach((item) => {
        if (item.$options.name === 'guluGridTabsHead') {
          const line = item.$refs.activeLine;
          item.$children.forEach((item1) => {
            if (item1.name === this.selected) {
              this.eventBus.$emit('update.selected', this.selected, item1);
            };
          })
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .tabs{
    width: 1000px;
    margin: 0 auto;
  }
</style>