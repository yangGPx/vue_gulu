<template>
  <div class="gulu-cascader">
    <div class="info-wrapper">
      <input type="text" class="info">
    </div>
    <div class="select-list">
      <ul>
        <li v-for="item1 in info"
          :class="{active: activeClass(item1, leave2Source)}" 
          @click="changeLeave2Source(item1)"
          :key="item1.label">
          {{ item1.label }}
        </li>
      </ul>
      <ul v-if="leave2Selected.length">
        <li v-for="item2 in leave2Selected"
          :class="{active: activeClass(item2, leave3Source)}" 
          @click="changeLeave3Source(item2)"
          :key="item2.label">
          {{ item2.label }}
        </li>
      </ul>
      <ul v-if="leave3Selected.length">
        <li v-for="item3 in leave3Selected" 
          :key="item3.label">
          {{ item3.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GuluCascader',
  props:{
    info: {
      type: Array,
    }
  },
  data(){
    return {
      leave2Source: null,
      leave3Source: null,
    }
  },
  computed: {
    leave2Selected() {
      if (this.leave2Source && Array.isArray(this.leave2Source.children)) {
        return this.leave2Source.children;
      }
      return [];
    },
    leave3Selected() {
      if (this.leave3Source && Array.isArray(this.leave3Source.children)) {
        return this.leave3Source.children;
      }
      return [];
    },
  },
  methods: {
    changeLeave2Source(val) {
      if (this.citySelected == undefined || val.label !== this.citySelected.label) {
        this.leave2Source = val;
        this.leave3Source = null;
      } 
    },
    changeLeave3Source(val) {
      this.leave3Source = val;
    },
    activeClass(item, obj) {
      if (obj) {
        return item.label === obj.label;
      }
      return false;
    }
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
  .select-list{
    display: flex;
    flex-shrink: 0;
    &>ul{
      border: 1px solid pink;
      display: inline-block;
      flex-shrink: 0;
      li{
        padding: 5px 10px;
        cursor: pointer;
        &:hover{
          background: pink;
        }
        &.active{
          background: pink;
        }
      }
    }
  }
} 
</style>