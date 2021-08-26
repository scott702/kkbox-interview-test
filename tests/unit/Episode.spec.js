import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import flushPromise from 'flush-promises';
import Episode from '@/views/Episode.vue';
import initLocalVue from './LocalVue';
import { PLAYER_STATE } from '@/scripts/constants';
import RssHelper from '@/scripts/RssHelper';
import {
  FAKE_ID, FAKE_EPISODE_ID, FAKE_DATA,
} from './FakeData';

const $route = {
  params: { id: FAKE_EPISODE_ID },
};
describe('Episode.vue', () => {
  const stubHide = sinon.stub();

  const stubShow = sinon.stub().returns({
    hide: stubHide,
  });
  const mount = (options = {}) => shallowMount(
    Episode,
    initLocalVue(
      {
        propsData: { rssId: FAKE_ID },
        mocks: {
          $loading: {
            show: stubShow,
            hide: stubHide,
          },
          $route,
        },
        ...options,
      },
      false,
    ),
  );

  let vm;
  afterEach(() => {
    sinon.restore();
  });

  it('test mounted', async () => {
    const stubRss = sinon.stub(RssHelper.prototype, 'getRss').resolves(FAKE_DATA);
    ({ vm } = mount());
    await flushPromise();
    sinon.assert.calledOnce(stubRss);
    sinon.assert.calledOnce(stubShow);
    sinon.assert.calledOnce(stubHide);
  });

  it('test already have episodes data', async () => {
    stubShow.reset();
    stubHide.reset();

    vm.$store.commit('episode/setEpisodes', FAKE_DATA.items);
    const stubFetch = sinon.stub(vm.$store, 'dispatch');

    vm.init(FAKE_EPISODE_ID);

    sinon.assert.notCalled(stubFetch);
    sinon.assert.match(vm.currEpisodeId, FAKE_EPISODE_ID);
    sinon.assert.notCalled(stubShow);
    sinon.assert.notCalled(stubHide);
  });

  it('test click paly btn', async () => {
    vm.handleClickPlayBtn();
    vm.$store.commit('player/setPlayerStateToPlay');
    await vm.$nextTick();
    sinon.assert.match(vm.isCurrEpisodePlaying, true);
    sinon.assert.match(vm.playBtnText, PLAYER_STATE.PAUSE);

    const spyToggle = sinon.spy(vm, 'togglePlayerState');
    vm.handleClickPlayBtn();
    sinon.assert.match(vm.playBtnText, PLAYER_STATE.PLAY);
    sinon.assert.calledWith(spyToggle);
    spyToggle.restore();

    vm.handleClickPlayBtn();
    sinon.assert.match(vm.playBtnText, PLAYER_STATE.PAUSE);
    sinon.assert.calledWith(spyToggle);
  });

  it('test init failed', async () => {
    const stubSet = sinon.stub(vm, 'setCurrEpisodeId');
    const fakeError = new Error('fake error');
    sinon.stub(vm, 'fetchEpisodes').rejects(fakeError);
    vm.$store.commit('episode/resetEpisodeState');

    vm.init(FAKE_EPISODE_ID);
    await flushPromise();

    sinon.assert.notCalled(stubSet);
  });

  it('test switch episode', async () => {
    const fakeInit = sinon.stub(vm, 'init');

    vm.$set(vm.$route.params, 'id', undefined);
    await vm.$nextTick();
    sinon.assert.notCalled(fakeInit);

    vm.$set(vm.$route.params, 'id', FAKE_ID);
    await vm.$nextTick();
    sinon.assert.calledWith(fakeInit, FAKE_ID);
  });
});
