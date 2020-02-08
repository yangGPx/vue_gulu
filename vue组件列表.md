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





# 24 栅格  

支持自适应相应，支持手机，平板，以及电脑的尺寸，默认为手机的尺寸。从小到大的兼容。

尺寸（px）===>

1. 手机：[0, 567)  从0px  到  567像素
2. 平板:  [567, 768)  
3. 电脑： [768, 无限）

## 结构

```js
    
基本用法
<g-row>
    <g-col span="12">1</g-col>
    <g-col span="10" offset="2">2</g-col>
</g-row>

row里面再嵌套row
<g-row>
  <g-col span="12">1</g-col>
  <g-col span="10" offset="2">2</g-col>
  <g-row>
    <g-col span="12" :ipad="{span: 5}">1</g-col>
    <g-col span="12" :ipad="{span: 19}">2</g-col>
  </g-row>
</g-row>
```

## GridRow 参数

```js
  props:{
    gutter:{
      type:[Number, String]
    }
  },
```

1. gutter : 每一个col之间的间隔

## GridCol参数

```js
  props:{
    span:{
      type: [String, Number]
    },
    offset: {
      type: [String, Number]
    },
    phone: {
      type: Object,
      validator
    },
    ipad: {
      type: Object,
      validator
    },
    pc: {
      type: Object,
      validator
    }
  },
```

1. span : 在24栅格中占多少格 , 范围[1,24]
2. offset ：col左侧空出多少格
3. ipad: 为Object。{ span: , offset }
4. pc: 为Object。{ span: , offset }



# Layout 布局组件   css比较重要

## 结构 四种布局样式

![layout说明图](C:\Users\NING MEI\Desktop\收集的图片\20200204\layout说明图.PNG)

```html
    第一种
	<g-layout style="height: 300px;">
      <g-layout-header class="header">header</g-layout-header>
      <g-layout-content>content</g-layout-content>
      <g-layout-footer class="footer">footer</g-layout-footer>
    </g-layout>
	第二种
    <g-layout style="height: 300px;">
      <g-layout-header class="header">header</g-layout-header>
      <g-layout>
        <g-layout-slider class="slider">slider</g-layout-slider>
        <g-layout-content>content</g-layout-content>
      </g-layout>
      <g-layout-footer class="footer">footer</g-layout-footer>
    </g-layout>
	第三种
    <g-layout style="height: 300px;">
      <g-layout-header class="header">header</g-layout-header>
      <g-layout>
        <g-layout-content>content</g-layout-content>
        <g-layout-slider class="slider" position="right">slider</g-layout-slider>
      </g-layout>
      <g-layout-footer class="footer">footer</g-layout-footer>
    </g-layout>
	第四种
    <g-layout style="height: 300px;">
      <g-layout-slider class="slider">
        slider
      </g-layout-slider>
      <g-layout>
        <g-layout-header class="header">header</g-layout-header>
        <g-layout-content>content</g-layout-content>
        <g-layout-footer class="footer">footer</g-layout-footer>
      </g-layout>
    </g-layout>
```

## 点

主要是 处理好slider和其他组件的关系