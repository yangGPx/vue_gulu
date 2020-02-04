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
        </tr>
      </tbody>
    </table>
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
    }
  },
  computed: {
    allChecked() {
      return this.selectedItems.length === this.data.length;
    }
  },
  methods: {
    inSelectedItems(item) {
      // 深拷贝之后的对象 和 原对象不一样 
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