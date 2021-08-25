import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import EpisodePlayer from '@/components/EpisodePlayer.vue';
import initLocalVue from './LocalVue';

describe('App.vue', () => {
  it('test player not visible', () => {
    const wrapper = shallowMount(App, initLocalVue());
    const { vm } = wrapper;
    sinon.assert.match(vm.showPlayer, false);
    const player = wrapper.findComponent(EpisodePlayer);

    sinon.assert.match(player.exists(), true);
    sinon.assert.match(player.isVisible(), false);
  });

  it('test player is visible', async () => {
    const wrapper = shallowMount(App, initLocalVue());
    const { vm } = wrapper;
    const fakePlayData = { fake: 'fake' };
    vm.$store.commit('player/setPlayingData', fakePlayData);

    await vm.$nextTick();
    sinon.assert.match(vm.showPlayer, true);

    const player = wrapper.findComponent(EpisodePlayer);
    sinon.assert.match(player.exists(), true);
    sinon.assert.match(player.isVisible(), true);
  });
});
