<template>
  <div class="collapse-item">
    <div class="title" @click="xxx">
      <template  v-if="title === ''">
        <slot name="title"></slot>
      </template>
      <template v-else>
        {{title}}
      </template>
    </div>
    <div class="content" v-if="showFlag">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CollapseItem',
  inject: ['eventBus'],
  data(){
    return {
      showFlag: false
    }
  },
  props:{
    title: {
      type: String,
      default:''
    },
    name: {
      type: String,
    }
  },
  methods: {
    xxx(){
      this.showFlag = !this.showFlag;
      if (this.eventBus.single) {
        this.eventBus.$emit('update.selected', this.name);
      }
    }
  },
  created() {
    this.eventBus.$on('update.selected', (name) => {
      this.showFlag = this.name === name;
    })
  },
}
</script>
<style lang="scss" scoped>
  .collapse-item{
    $borderRadius:5px;
    & .title,& .content{
      padding: 0.5em 1em;border: 1px solid #f83;margin: -1px;
    }
    & .title{
      cursor: pointer;
    }
    &:first-child{
      .title{
        border-top-left-radius: $borderRadius;border-top-right-radius: $borderRadius;
      }
    }
    &:last-child{
      &>div:last-child{
        border-bottom-left-radius: $borderRadius;border-bottom-right-radius: $borderRadius;
      }
    }
  }
</style>