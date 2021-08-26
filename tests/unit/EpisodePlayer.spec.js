/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import flushPromise from 'flush-promises';
import EpisodePlayer from '@/components/EpisodePlayer.vue';
import initLocalVue from './LocalVue';
import { PLAYER_STATE, ROUTE_NAME } from '@/scripts/constants';
import RssHelper from '@/scripts/RssHelper';
import {
  FAKE_ID, FAKE_EPISODE_ID, FAKE_DATA,
} from './FakeData';

describe('EpisodePlayer.vue', () => {
  const stubPush = sinon.stub();
  const stubLoad = sinon.stub();
  const stubPlay = sinon.stub();
  const stubPause = sinon.stub();
  const stubStart = sinon.stub();
  const stubEnd = sinon.stub();
  const fakeAudio = {
    paused: true,
    buffered: {
      length: 0,
      start: stubStart,
      end: stubEnd,
    },
    readyState: 0,
    currentTime: 0,
  };
  window.HTMLMediaElement.prototype.load = stubLoad;
  window.HTMLMediaElement.prototype.play = stubPlay;
  window.HTMLMediaElement.prototype.pause = stubPause;
  Object.defineProperty(window.HTMLMediaElement.prototype, 'paused', {
    get() {
      return fakeAudio.paused;
    },
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'buffered', {
    get() {
      return fakeAudio.buffered;
    },
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'readyState', {
    get() {
      return fakeAudio.readyState;
    },
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
    get() {
      return fakeAudio.currentTime;
    },
    set(value) {
      fakeAudio.currentTime = value;
    },
  });
  const handleMount = (options = {}) => shallowMount(
    EpisodePlayer,
    initLocalVue(
      {
        stubs: ['font-awesome-icon', 'router-link'],
        mocks: {
          $router: { push: stubPush },
          $refs: {
            audio: fakeAudio,
          },
        },
        ...options,
      },
      false,
    ),
  );

  let vm;
  let wrapper;
  afterEach(() => {
    sinon.restore();
    stubPush.reset();
    stubLoad.reset();
    stubPlay.reset();
    stubPause.reset();
    stubStart.reset();
    stubEnd.reset();
  });

  it('should match default data after mounted', () => {
    wrapper = handleMount();
    ({ vm } = wrapper);

    sinon.assert.match(vm.$data, {
      PLAYER_STATE,
      ROUTE_NAME,
      seekValue: 0,
      isLoading: false,
    });
  });

  it('start to play audio', async () => {
    stubPlay.resolves();
    vm.$store.commit('player/setPlayingData', FAKE_DATA.items[1]);
    await vm.$nextTick();
    sinon.assert.calledWith(stubLoad);
    sinon.assert.match(vm.isLoading, true);

    await vm.$nextTick();
    fakeAudio.paused = false;
    sinon.assert.calledWith(stubPlay);
    sinon.assert.match(vm.$refs.audio.currentTime, 0);
    sinon.assert.match(vm.playerState, PLAYER_STATE.PLAY);
    sinon.assert.match(vm.isLoading, false);
  });

  it('pause audio', async () => {
    const spyWatch = sinon.spy(vm, 'watchPlayerState');
    vm.setPlayerStateToPause();
    await vm.$nextTick();
    sinon.assert.calledWith(spyWatch, PLAYER_STATE.PAUSE);

    await vm.$nextTick();
    sinon.assert.calledWith(stubPause);
    fakeAudio.paused = true;
  });

  it('play next episode', async () => {
    stubPlay.resolves();
    vm.$store.commit('episode/setEpisodes', FAKE_DATA.items);
    await vm.$nextTick();

    vm.onAudioEnd();
    await vm.$nextTick();
    sinon.assert.match(vm.playingData, FAKE_DATA.items[0]);

    vm.onAudioEnd();
    await vm.$nextTick();
    sinon.assert.match(vm.playingData, {});
    fakeAudio.paused = true;
  });

  it('<audio> pause event triggered', async () => {
    const stub = sinon.stub(vm, 'setPlayerStateToPause');
    vm.onPause();
    await vm.$nextTick();
    sinon.assert.notCalled(stub);

    fakeAudio.buffered.length = 1;
    vm.onPause();
    await vm.$nextTick();
    sinon.assert.calledWith(stub);
  });

  it('<audio> play event triggered', () => {
    const stub = sinon.stub(vm, 'setPlayerStateToPlay');
    vm.isLoading = true;
    vm.onPlay();
    sinon.assert.calledWith(stub);
    sinon.assert.match(vm.isLoading, false);
  });

  it('<audio> loadeddata event triggered', () => {
    const stub = sinon.stub(vm, 'onPlay');
    vm.onLoadeddata();
    sinon.assert.calledWith(stub);
  });

  it('<audio> progress event triggered', () => {
    vm.isLoading = true;
    const stubCheck = sinon.stub(vm, 'checkBuffered');
    const stubSetPlayer = sinon.stub(vm, 'setPlayerStateToPlay');
    stubCheck.returns(false);
    vm.onAudioProgress();
    sinon.assert.match(vm.isLoading, true);
    sinon.assert.notCalled(stubSetPlayer);

    stubCheck.returns(true);
    vm.onAudioProgress();
    sinon.assert.match(vm.isLoading, false);
    sinon.assert.calledWith(stubSetPlayer);
  });

  it('test checkBuffered', () => {
    fakeAudio.buffered.length = 0;
    sinon.assert.match(vm.checkBuffered(), false);
    sinon.assert.match(vm.isLoading, true);

    stubStart.returns(0);
    stubEnd.returns(3);
    fakeAudio.currentTime = 5;
    fakeAudio.buffered.length = 1;
    sinon.assert.match(vm.checkBuffered(), false);
    sinon.assert.match(vm.isLoading, true);

    stubEnd.returns(10);
    sinon.assert.match(vm.checkBuffered(), true);
    sinon.assert.match(vm.isLoading, false);

    fakeAudio.readyState = 4;
    sinon.assert.match(vm.checkBuffered(), true);
    sinon.assert.match(vm.isLoading, false);
  });

  it('<audio> timeupdate event triggered', () => {
    const test = (num) => {
      vm.onAudioTimeUpdate({
        target: {
          currentTime: num,
        },
      });
      sinon.assert.match(vm.seekValue, num);
    };
    test(10);
    test(20);
    test(30);
  });
  it('<audio> suspended event triggered', () => {
    vm.onSuspended();
    sinon.assert.match(vm.isLoading, true);
  });

  it('test handleSeekChange', () => {
    vm.seekValue = 30;
    vm.handleSeekChange();
    sinon.assert.match(vm.$refs.audio.currentTime, 30);
  });

  it('test handleSeekInput', () => {
    const stub = sinon.stub(vm, 'handlePauseAudio');
    vm.handleSeekInput();
    sinon.assert.notCalled(stub);

    fakeAudio.paused = false;
    vm.handleSeekInput();
    sinon.assert.calledWith(stub);
  });

  it('test handlePlayAudio', () => {
    stubPlay.resolves();
    vm.handlePlayAudio();
    sinon.assert.notCalled(stubPlay);

    fakeAudio.paused = true;
    vm.handlePlayAudio();
    sinon.assert.calledWith(stubPlay);

    fakeAudio.paused = false;
  });

  it('test handlePauseAudio', () => {
    vm.handlePauseAudio();
    sinon.assert.calledWith(stubPause);
    fakeAudio.paused = true;

    stubPause.reset();
    vm.handlePauseAudio();
    sinon.assert.notCalled(stubPause);
  });
});
