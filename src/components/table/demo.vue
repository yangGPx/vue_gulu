<template>
  <div class="table-demo">
    <h1>mock Table的数据 以及 使用Table的例子</h1>
    {{ selectedItems }}
    <g-table :data="dataSource" 
      :columns="columns"
      :border="true"
      :compact="true"
      :selection="true"
      :selectedItems.sync="selectedItems"
      :loading="loading"
      @selectAll="onSelectItems"
      @selectOne="x">
    </g-table>
    <div @click="closeLoading">22222</div>
  </div>
</template>
<script>
export default {
  name: "TableDemo",
  data() {
    return {
      columns: [
        { text: '名字', field: 'name' },
        { text: '分数', field: 'score' },
      ],
      dataSource: [
        { id: 0, name: "东华", score: 100 },
        { id: 1, name: "连宋", score: 100 },
        { id: 2, name: "白凤九", score: 100 },
        { id: 3, name: "姬蘅", score: 100 },
        { id: 4, name: "知鹤", score: 100 },
        { id: 5, name: "折颜", score: 100 },
        { id: 6, name: "叶青缇", score: 100 },
      ],
      selectedItems: [],
      loading: true,
    }
  },
  methods: {
    x(obj) {
      const { selected, item } = obj;
    },
    onSelectItems(val) {
      console.log('全选操作');
    },
    closeLoading() {
      this.loading = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  h1{
    text-align: center;
    margin-bottom: 20px;
  }
</style>