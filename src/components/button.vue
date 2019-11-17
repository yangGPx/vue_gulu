<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: iconPosition}"
     @click="$emit('stopload')">
    <div class="content">
      <slot></slot>
    </div>
    <g-icon :icon="icon"/>  
    <template  v-if="!loading">
      <g-icon :icon="icon"/>  
    </template>
    <template v-else>
      <g-icon icon="loading" class="icon-loading" />  
    </template>
    </button>
</template>
<script>
export default {
    name: 'title',
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
  .g-button{
      font: inherit;
      font-size: var(--font-size);
      height: var(--button-height);
      padding: 0 1em;
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      background: var(--button-bg);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover{
        border-color: var(--button-active-border);
        color: var(--button-active-border);
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