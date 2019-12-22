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
      // 这里是有问题的  并没把数据发出去  做校验  告诉父组件  如果要记录数据  就没有办法实现.
      // 所有的数据必须发送到父组件中 或者更上一层更新  所以这里必须发出去   
      // 单向数据流的概念  这里只是因为还不够复杂
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
      .content{
        border-bottom-left-radius: $borderRadius;border-bottom-right-radius: $borderRadius;
      }
    }
  }
</style>