import Vue from 'vue';
import App from './App.vue';
import Button from './components/button/GuluButton.vue';
import ButtonFroup from './components/button/buttonGroup.vue';
import Icon from './components/GuluIcon.vue';
import GridRow from './components/grid/GridRow.vue';
import GridCol from './components/grid/GridCol.vue';
import GridLayout from './components/layoutC/Layout.vue';
import GridHeader from './components/layoutC/Header.vue';
import GridContent from './components/layoutC/Content.vue';
import GridSlider from './components/layoutC/Slider.vue';
import GridFooter from './components/layoutC/Footer.vue';
import Tabs from './components/tabs/Tabs.vue';
import TabsHead from './components/tabs/TabsHead.vue';
import TabsBody from './components/tabs/TabsBody.vue';
import TabsHeadItem from './components/tabs/TabsHeadItem.vue';
import TabsBodyPane from './components/tabs/TabsBodyPane.vue';
import plugin from './components/ToastPlugin';
import PopOver from './components/PopOver.vue';
import Collapse from './components/collapse/Collapse.vue';
import CollapseItem from './components/collapse/CollapseItem.vue';
import Cascader from './components/cascader/Cascader.vue';
import CascaderItem from './components/cascader/CascaderItem.vue';
import Slider from './components/slider/GuluSlider.vue';
import SliderItem from './components/slider/GuluSliderItem.vue';

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
Vue.component('g-cascader', Cascader)
Vue.component('g-cascader-item', CascaderItem)
Vue.component('g-slider', Slider)
Vue.component('g-slider-item', SliderItem)

new Vue({
  render: h => h(App),
}).$mount('#app')
