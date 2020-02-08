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
  name: 'GuluCollapseItem',
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
      required: true,
    }
  },
  methods: {
    xxx(){
      if (this.showFlag) {
        this.eventBus.$emit('update.removeSelected', this.name);
        this.close();
      } else {
        this.eventBus.$emit('update.addSelected', this.name)
        this.open();
      }
    },
    open(){
      this.showFlag = true;
    },
    close() {
      this.showFlag = false;
    }
  },
  created() {
    this.eventBus.$on('update.selected', (names) => {
      this.showFlag = names.indexOf(this.name) > -1;
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
      background: #f5f5f5;
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