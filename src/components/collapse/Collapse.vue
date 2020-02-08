<template>
  <div class="collapse">
    {{ itemList }}
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'GuluCollapse',
  data(){
    return {
      eventBus: new Vue(),
      itemList: [],
    }
  },
  props: {
    default: String,
    single: {
      type: Boolean,
      default: false
    },
  },
  created() {
    this.eventBus.$on('update.selected', (names) => {
      this.itemList = names;
    })
    this.eventBus.$on('update.removeSelected', (name) => {
      this.itemList.splice(this.itemList.indexOf(name), 1);
      this.eventBus.$emit('update.selected', this.itemList);
    })
    this.eventBus.$on('update.addSelected', (name) => {
      if (this.single) {
        this.itemList = [name];
      } else {
        this.itemList.push(name);
      }
      this.eventBus.$emit('update.selected', this.itemList);
    })
  },
  mounted(){
    if (this.default) {
      this.itemList.push(this.default);
    }
    this.eventBus.$emit('update.selected', this.itemList);
  },
  provide(){
    return {
      eventBus: this.eventBus
    }
  }
}
</script>