<template>
  <div class="gulu-cascader-item">
    <ul class="left">
      <li v-for="item in list" :key="item.label" @click="select(item)">{{item.label}}</li>
    </ul>
    <gulu-cascader-item ref="right" v-if="selectedItem" :list="selectedItem"></gulu-cascader-item>
  </div>
</template>
<script>
import CascaderItem from './CascaderItem.vue';

export default {
  name: 'GuluCascaderItem',
  props: {
    list: {
      type: Array
    }
  },
  data(){
    return {
      selectedItem: null,
    };
  },
  methods: {
    select(val){
      if (val.childrens != undefined) {
        this.selectedItem = val.childrens;
      }
    }
  },
  created() {
    console.log(this.list)
  },
}
</script>
<style lang="scss" scpoed>
  .gulu-cascader-item{
    display: flex;
    &>ul{
      border: 1px solid pink;
    }
  }
</style>