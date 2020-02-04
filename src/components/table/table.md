# Table
需求分析  先参考业界的完成组件 比如 element  antDesign

Api 怎么设计  
怎么做实现功能 

在具有一定功能或者一定数据复杂度的时候，组件的复杂度 是没有办法降低的
可以选择 标签的复杂度降低  或者  对组件内部的逻辑处理降低

本次组件选择减低标签复杂度  尝试vue的形式实现少标签 实现table
、
<g-table :columns="columns" :data="dataSource">

columns 代表表头是什么标题 以及该列用什么字段
data  是数据源

功能
1. 展示功能：是否有表框  单双行不同背景色  紧凑 松散
2. 选择操作 全选 单选
3. 排序 还有 过滤功能给后台处理 拖拽排序 
4. 固定头
5. 编辑功能  

## props
```js
  columns:[
    { text: '名字', field: "name" },
    { text: '分数', field: "score" }
  ]

  data: {
    {
      id: 0,
      name: '逢坂大河',
      score: 100
    }
  }

``` 