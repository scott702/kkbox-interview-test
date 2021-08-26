/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import { Breadcrumb } from 'ant-design-vue';
import Navbar from '@/components/Navbar.vue';
import initLocalVue from './LocalVue';
import { FAKE_ID, FAKE_EPISODE_ID, FAKE_DATA } from './FakeData';
import { ROUTE_NAME } from '@/scripts/constants';

const stubs = ['router-link'];
const mount = (options = {}) => shallowMount(
  Navbar,
  initLocalVue({ stubs, ...options }, false),
);

describe('Navbar.vue', () => {
  let vm;
  let wrapper;
  afterEach(() => {
    sinon.restore();
  });

  it('test on Home page', () => {
    const $route = { name: ROUTE_NAME.HOME };
    const mocks = { $route };
    wrapper = mount({ mocks });
    ({ vm } = wrapper);

    const right = wrapper.find('div.right-breadcrumbs');
    sinon.assert.match(right.exists(), false);
    const left = wrapper.findComponent(Breadcrumb);
    sinon.assert.match(left.exists(), true);
    sinon.assert.match(vm.currRoutes[0].name, ROUTE_NAME.HOME);
  });
});

describe('Navbar.vue on Episode page', () => {
  let vm;
  let wrapper;
  const $route = { name: ROUTE_NAME.EPISODE };
  const mocks = { $route };

  const options = { mocks, stubs };
  afterEach(() => {
    sinon.restore();
    sinon.reset();
  });

  it('test on Episode page', async () => {
    wrapper = mount(options);
    ({ vm } = wrapper);

    vm.$store.commit('episode/setEpisodes', FAKE_DATA.items);
    vm.$store.commit('episode/setCurrEpisodeId', FAKE_DATA.items[1].guid);
    await vm.$nextTick();

    const right = wrapper.find('div.right-breadcrumbs');
    sinon.assert.match(right.exists(), true);

    const left = wrapper.findComponent(Breadcrumb);
    sinon.assert.match(left.exists(), true);

    sinon.assert.match(vm.currRoutes[0].name, ROUTE_NAME.HOME);
    sinon.assert.match(vm.currRoutes[1].name, ROUTE_NAME.EPISODE);
    sinon.assert.match(wrapper.find('.divider').exists(), true);
    sinon.assert.match(wrapper.find('.prev-episode').exists(), true);
    sinon.assert.match(wrapper.find('.next-episode').exists(), true);
  });

  it('without next episode', async () => {
    vm.$store.commit('episode/setCurrEpisodeId', FAKE_DATA.items[0].guid);
    await vm.$nextTick();
    sinon.assert.match(wrapper.find('.divider').exists(), false);
    sinon.assert.match(wrapper.find('.prev-episode').exists(), true);
    sinon.assert.match(wrapper.find('.next-episode').exists(), false);
  });

  it('without prev episode', async () => {
    vm.$store.commit('episode/setCurrEpisodeId', FAKE_DATA.items[2].guid);
    await vm.$nextTick();
    sinon.assert.match(wrapper.find('.divider').exists(), false);
    sinon.assert.match(wrapper.find('.prev-episode').exists(), false);
    sinon.assert.match(wrapper.find('.next-episode').exists(), true);
  });

  it('without prev and next episode', async () => {
    vm.$store.commit('episode/setCurrEpisodeId', FAKE_ID);
    await vm.$nextTick();
    sinon.assert.match(wrapper.find('.divider').exists(), false);
    sinon.assert.match(wrapper.find('.prev-episode').exists(), false);
    sinon.assert.match(wrapper.find('.next-episode').exists(), false);
  });
});
