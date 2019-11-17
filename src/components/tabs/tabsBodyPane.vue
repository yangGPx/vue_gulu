<template>
  <div class="tabs-body-pane" :class="{'active':active}" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'guluGridTabsBodyPane',
  inject:['eventBus'],
  data(){
    return {
      active: false,
    }
  },
  props:{
    name: {
      type: String,
      required: true
    }
  },
  created() {
    this.eventBus.$on('update.selected', (param) => {
      this.active = param == this.name;
    })
  },
  computed: {
    
  }
}
</script>
<style lang="scss" scoped>
  .active{
    border: 1px solid #ddd;
    border-top: none;
  }
</style>