<template>
  <div id="app">
    <g-slider :selected.sync="selected" 
      :height="400">
      <g-slider-item name="hello">1111</g-slider-item>
      <g-slider-item name="world">2222</g-slider-item>
      <g-slider-item name="me">3333</g-slider-item>
    </g-slider>
    {{selected}}
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return{ 
      selected: 'hello'
    }
  }
}
</script>

<style>
 *{
   margin: 0;padding: 0;box-sizing: border-box;
 }
</style>
