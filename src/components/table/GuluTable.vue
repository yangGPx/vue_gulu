<template>
  <div class="gulu-table-wrapper">
    <table  class="gulu-table" :class="{ border, compact, striped}">
      <thead>
        <tr >
          <th v-if="numVisiable">#</th>
          <td v-if="selection">
            <input type="checkbox" @change="onChangeAllItems" ref="allCheck" :checked="allChecked"/>
          </td>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.text }}
          </th>
          <th>
            删除
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <td v-if="numVisiable">{{ item.id + 1 }}</td>
          <td v-if="selection">
            <input @change="onChangeItem(item, index, $event)" 
              type="checkbox"
              :checked="inSelectedItems(item)"/>
          </td>
          <td v-for="(column, index) in columns" :key="index">
            {{ item[column.field] }}
          </td>
          <td>
            <g-button @click="deleteItem(index)">删除</g-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="gulu-table-loading" v-if="loading">
      <g-icon icon="loading"></g-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GuluTable',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    numVisiable: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    allChecked() {
      // 这样写可能有问题，不严谨，因为用了单向数据流和深拷贝，显示的数组和原数组不是同一个数组
      // return this.selectedItems.length === this.data.length;
      const source = this.data.map(i => i.id).sort();
      const select = this.selectedItems.map(i => i.id).sort();
      let equal = true;
      if (source.length === select.length) {
        for (let i = 0;i<source.length;i++) {
          if (source[i] !== select[i]) {
            equal = false;
            break;
          }
        }
      } else {
        equal = false;
      }
      return equal;
    }
  },
  methods: {
    inSelectedItems(item) {
      // 序列化深拷贝之后的对象 和 原对象不一样 
      return this.selectedItems.filter(e => e.id === item.id).length > 0;
    },
    onChangeItem(item, index, e) {
      const selected = e.target.checked;
      const copy = JSON.parse(JSON.stringify(this.selectedItems));
      if (selected) {
        copy.push(item);
      } else {
        copy.forEach((e, i) => {
          if (e.id === item.id) {
            copy.splice(i, 1);
          }  
        });
      }
      this.$emit('update:selectedItems', copy);
      this.$emit('selectOne', { selected, item, index });
    },
    onChangeAllItems(e) {
      const selected = e.target.checked;
      this.$emit('selectAll', selected ? this.data : []);
      this.$emit('update:selectedItems', selected ? this.data : []);
    },
    deleteItem(index) {
      this.data.splice(index, 1);
    }
  },
  watch: {
    selectedItems(val) {
      if (this.allChecked) {
        this.$refs.allCheck.indeterminate = false;
      } else if (this.selectedItems.length == 0) {
        this.$refs.allCheck.indeterminate = false;
      } else {
        this.$refs.allCheck.indeterminate = true;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss'
</style>