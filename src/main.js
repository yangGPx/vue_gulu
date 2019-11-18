import Vue from 'vue';
import chai from 'chai';
import Button from './components/button.vue';
import Icon from './components/icon.vue';
import ButtonFroup from './components/buttonGroup.vue';
import GridRow from './components/grid/gridRow.vue';
import GridCol from './components/grid/gridCol.vue';
import GridLayout from './components/layoutC/Layout.vue';
import GridHeader from './components/layoutC/Header.vue';
import GridContent from './components/layoutC/Content.vue';
import GridSlider from './components/layoutC/Slider.vue';
import GridFooter from './components/layoutC/Footer.vue';
import Tabs from './components/tabs/tabs.vue';
import TabsHead from './components/tabs/tabsHead.vue';
import TabsBody from './components/tabs/tabsBody.vue';
import TabsHeadItem from './components/tabs/tabsHeadItem.vue';
import TabsBodyPane from './components/tabs/tabsBodyPane.vue';
import plugin from './components/ToastPlugin';
import PopOver from './components/PopOver.vue';
import Collapse from './components/collapse/Collapse.vue';
import CollapseItem from './components/collapse/CollapseItem.vue';

Vue.use(plugin);
Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonFroup)
Vue.component('g-row', GridRow)
Vue.component('g-col', GridCol)
Vue.component('g-layout', GridLayout)
Vue.component('g-layout-header', GridHeader)
Vue.component('g-layout-content', GridContent)
Vue.component('g-layout-slider', GridSlider)
Vue.component('g-layout-footer', GridFooter)
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsHeadItem)
Vue.component('g-tabs-pane', TabsBodyPane)
Vue.component('g-popover', PopOver)
Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)

let rm = new Vue({
    el: '#app',
    data:{
      loadFlag: true,
      msg: '根文件测试信息',
      selecteTab: 'nav2',
      collapseDefault: 'title2'
    },
    created(){
      // this.addToast();
    },
    updated(){
      console.log(this.selecteTab);
    },
    methods: {
      addToast(){
        this.$toast(`<span style="color:red">这是第一段文字</span>`, {
          closeButton:{
            text:'知道了',
            callback(){
              console.log('这是调用Toast插件之后传回去的回调方式');
            }
          },
          autoCloseDelay:5000,
          enableHtml: true,
          position: 'middle'
        });
      }
    }
})

const expect = chai.expect;
{
  // 第一个单元测试 测试button
  // 动态加载组件
  const Constructor = Vue.extend(Button);
  const button = new Constructor({
    propsData:{
      icon:'setting'
    }
  })
  button.$mount('#test');

  // 开始测试
  let useElement = button.$el.querySelector('use');
  let href = useElement.getAttribute('xlink:href');

  expect(href).to.equal('#icon-setting');
}
