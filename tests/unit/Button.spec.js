/* eslint-disable no-unused-vars */
import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import Button from '@widget/Button.vue';
import initLocalVue from './LocalVue';
import { FAKE_TITLE } from './FakeData';

const mount = (options = {}) => shallowMount(
  Button,
  initLocalVue(options, false),
);

describe('Button.vue', () => {
  let vm;
  let wrapper;
  const stubEmit = sinon.stub();
  beforeEach(() => {
    wrapper = mount({
      propsData: {
        text: FAKE_TITLE,
      },
      mocks: {
        $emit: stubEmit,
      },
    });
    ({ vm } = wrapper);
  });

  afterEach(() => {
    sinon.restore();
    stubEmit.reset();
  });

  it('normal button', () => {
    const btn = wrapper.find('.btn-play');
    sinon.assert.match(btn.exists(), true);
    sinon.assert.match(btn.text(), FAKE_TITLE);
  });

  it('circle button', async () => {
    wrapper.setProps({ circle: true });
    await vm.$nextTick();
    let btn = wrapper.find('.btn-play');
    sinon.assert.match(btn.exists(), false);

    btn = wrapper.find('.btn-play-circle');
    sinon.assert.match(btn.exists(), true);
  });

  it('test on click', () => {
    const btn = wrapper.find('.btn-play');
    btn.trigger('click');
    sinon.assert.calledWith(stubEmit, 'click');
  });

  it('disabled button', async () => {
    wrapper.setProps({ disabled: true });
    await vm.$nextTick();
    const btn = wrapper.find('.btn-play.disabled');
    sinon.assert.match(btn.exists(), true);
    btn.trigger('click');
    sinon.assert.notCalled(stubEmit);
  });
});
