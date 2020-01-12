<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: iconPosition}"
     @click="$emit('click')">
    <div class="content">
      <slot></slot>
    </div>
    <template  v-if="!loading">
      <g-icon :icon="icon"/>  
    </template>
    <template v-else>
      <g-icon icon="loading" class="icon-loading" />  
    </template>
    </button>
</template>
<script>
import GIcon from '../GuluIcon.vue';

export default {
    name: 'GuluButton',
    components: {
      GIcon,
    },
    data(){
      return{
      }
    },
    props: {
      icon:{
        type: String,
      },
      iconPosition:{
        type: String,
        default: 'left',
        validator(value){
          return value === 'left' || value === 'right';
        }
      },
      loading:{
        type: Boolean,
        default: false,
      }
    },
}
</script>
<style lang="scss">
@import '~@/assets/css/common.scss';
  .g-button{
      font: inherit;
      height: $button-height;
      padding: 0 1em;
      border-radius: $border-radius;
      border: 1px solid $border-color;
      background: $button-bg;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover{
        border-color: $button-active-border;
        color: $button-active-border;
      }
      &:focus{
        outline: none;
      }
      .content{
        margin-left: 0.2em;
      }
      .icon{order: 1}
      .content{order: 2}
      &.icon-right{
        .icon{
          order: 2;
        }
        .content{
          order: 1;
          margin-left: 0;
          margin-right: 0.2em;
        }
      }
  }
</style>