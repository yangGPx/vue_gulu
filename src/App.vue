<template>
  <div id="app">
    <!-- <g-slider :selected.sync="selected" 
      :height="400">
      <g-slider-item name="hello">1111</g-slider-item>
      <g-slider-item name="world">2222</g-slider-item>
      <g-slider-item name="me">3333</g-slider-item>
    </g-slider> -->
    <!-- <g-button icon="setting" :loading="true">按钮</g-button> -->
    <!-- {{selected}} -->
    <!-- <g-cascader :info="source"></g-cascader> -->
    <table-demo></table-demo>
  </div>
</template>

<script>
import TableDemo from './components/table/demo.vue'

export default {
  name: 'app',
  components: {
    TableDemo,
  },
  data() {
    return{ 
      selected: 'hello',
    }
  }
}
</script>

<style>
 *{
   margin: 0;padding: 0;box-sizing: border-box;
 }
 #app{
   padding: 10px;
 }
</style>
