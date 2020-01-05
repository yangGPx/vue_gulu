<template>
  <div class="gulu-cascader">
    <input type="text" class="info">
    <g-cascader-item :list="data"></g-cascader-item>
  </div>
</template>
<script>
export default {
  name: 'GuluCascader',
  props:{
    data: {
      type: Array,
    }
  },
  data(){
    return {
      citySelected: null,
      districtSelected: null,
    }
  },
  computed: {
    citySel() {
      return this.citySelected == undefined 
      ? null : this.citySelected.childrens;
    },
    districtSel() {
      return this.districtSelected == undefined 
      ? null : this.districtSelected.childrens;
    },
  },
  methods: {
    changeProvice(val) {
      if (this.citySelected == undefined || val.label !== this.citySelected.label) {
        this.citySelected = val;
        this.districtSelected = null;
      } 
    },
    changeCity(val) {
      this.districtSelected = val;
    },
  },
}
</script>
<style lang="scss" scpoed>
@import '~@/assets/css/common.scss';
.gulu-cascader{
  margin: 100px;
  .info{
    width: 200px;
    padding: 0.2em;
  }
} 
</style>