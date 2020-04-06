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
    <!-- <table-demo></table-demo>
    <h1>Collapse</h1>
    <g-collapse>
      <g-collapse-item title="这是第一栏" name="1">
        第一栏
      </g-collapse-item>
      <g-collapse-item title="这是第二栏" name="2">
        第二栏
      </g-collapse-item>
      <g-collapse-item title="这是第三栏" name="3">
        第三栏
      </g-collapse-item>
    </g-collapse>
    <h1>栅格系统</h1>
    <g-row>
      <g-col span="12">1</g-col>
      <g-col span="10" offset="2">2</g-col>
      <g-row>
        <g-col span="12" :ipad="{span: 5}">1</g-col>
        <g-col span="12" :ipad="{span: 19}">2</g-col>
      </g-row>
    </g-row> -->
    <upload-demo>
    </upload-demo>
  </div>
</template>

<script>
import TableDemo from './components/table/demo.vue'
import UploadDemo from './components/upload/demo.vue'

export default {
  name: 'app',
  components: {
    TableDemo,
    UploadDemo,
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
