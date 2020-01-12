import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount } from '@vue/test-utils'
import Icon from '@/components/GuluIcon.vue'

chai.use(sinonChai)

describe('Icon', () => {
  it('是否还有引进了svg', () => {
    const wrapper = mount(Icon, {
      propsData: {
        icon: 'settings'
      }
    });

    const vm = wrapper.vm;
    const use = vm.$el.querySelectorAll('use')[0];
    expect(use.getAttribute('xlink:href')).to.eq('#icon-settings');
  })
});
