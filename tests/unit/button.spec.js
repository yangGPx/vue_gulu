import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import Button from '@/components/button/GuluButton.vue';
chai.use(sinonChai)

describe('TestButton', () => {
  it('按钮是否存在', () => {
    const wrapper = mount(Button);
    expect(wrapper.exists()).to.be.true;
  })
  it('不输入icon的时候有没有icon', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: ''
      }
    });
    const useElements = wrapper.findAll('use');
    expect(useElements.length).to.equal(0);
  })
  it('输入icon: setting', () => {
    // 输入icon: setting  图标应该为#icon-loading
    const wrapper = mount(Button, {
      propsData: {
        icon: 'setting'
      }
    });
    const useElment = wrapper.find('use');
    expect(useElment.attributes()['href']).to.equal('#icon-setting');
  })

  it('输入loading true和icon', () => {
    // 设置loading 为true  图标应该为#icon-loading
    const wrapper = mount(Button, {
      propsData: {
        icon: 'setting',
        loading: true,
      }
    });
    const useElements = wrapper.findAll('use');
    expect(useElements.length).to.equal(1);
    expect(useElements.at(0).attributes()['href']).to.equal('#icon-loading');
  })

  it('设置图标的位置', () => {
    // 图标位置默认为left
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'setting',
      }
    });
    const vm = wrapper.vm;
    const icon = vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.equal('1');
  })

  it('iconPostion => right', () => {
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'setting',
        iconPosition: 'right'
      }
    })
    const svg = wrapper.find('svg').vm.$el;
    expect(getComputedStyle(svg).order).to.equal('2');
  })

  it('点击按钮 触发传进的click', () => {
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'setting',
      },
    })

    const callback = sinon.fake();
    const vm = wrapper.vm;
    vm.$on('click', callback);
    wrapper.trigger('click');
    expect(callback).to.have.been.called
  })

})
