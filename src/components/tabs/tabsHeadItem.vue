<template>
  <div class="tabs-head-item" @click="xxx" :class="{'active':active}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'GuluTabsHeadItem',
  inject:['eventBus'],
  data() {
    return {
      active: false
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
    });
  },
  methods: {
    xxx(){
      console.log('click')
      this.eventBus.$emit('update.selected', this.name, this);
    }
  },
}
</script>
<style lang="scss" scoped>
  .tabs-head-item{
    height: 42px;
    display: flex;
    align-items: center;
    // width: 50px;
    padding: 0 10px;
    color: #ddd;
    cursor: pointer;
    &.active{
      color: #f83;
    }
  }
  
</style>