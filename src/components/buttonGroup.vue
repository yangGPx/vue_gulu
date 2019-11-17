<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'button-group',
}
</script>
<style lang="scss">
  .button-group{
    display: flex;
    .g-button{
      margin-left: -1px;
      &:first-child{
        margin-left: 0;
      }
      &:hover{
        position: relative;
        z-index: 1;
      }
    }
  }
</style>