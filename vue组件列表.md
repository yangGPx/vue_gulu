#  Collapse 折叠

## 结构

```js
   <g-collapse>
      <g-collapse-item title="这是第一栏" name="1">
        第一栏
      </g-collapse-item>
      <g-collapse-item title="这是第二栏" name="2">
        第二栏
      </g-collapse-item>
      <g-collapse-item name="3">
        <template slot="title">
          <h1>另一种</h1>
        </template>
        第三栏
      </g-collapse-item>
   </g-collapse>

title可以是props的string，或者插槽
 <template slot="title">
    <h1>另一种</h1>
 </template>
```



## collapse参数

### props

```js
  props: {
    default: String,  
    single: {
      type: Boolean,
      default: false
    },
  },
```

1. default : 默认选中
2. single :  多个折叠项中  只能 展开一个   

## collapse-item 参数

### props

```js
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
```

1. title:  折叠项标题，string/slot
2. name:  必须加的，用来区分是哪一个折叠项，必须唯一