<template>
  <svg class="icon" v-if="icon">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>
<script>
export default {
  name:'GuluIcon',
  data() {
    return {};
  },
  props: {
    icon: {
      type: String
    }
  },
};
</script>
<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  &.icon-loading{
    animation: spin 2s infinite linear;
  }
  @keyframes spin {
    from{ transform: rotate(0deg); }; 
    to{ transform: rotate(360deg); }; 
  }
}
</style>