<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'Collapse',
  data(){
    return {
      eventBus: new Vue(),
    }
  },
  props: {
    default: String,
    single: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log('default',this.default);
    this.eventBus.single = this.single
    this.eventBus.$on('update.selected', (name) => {
      this.$emit('update.default', name);
    })
  },
  mounted(){
    this.eventBus.$emit('update.selected', this.default)
  },
  provide(){
    return {
      eventBus: this.eventBus
    }
  }
}
</script>
<style lang="scss" scoped>
  .collapse{
  }
</style>