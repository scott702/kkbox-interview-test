import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import EpisodeListItem from '@/components/EpisodeListItem.vue';
import initLocalVue from './LocalVue';
import { FAKE_EPISODES, FAKE_EPISODE_ID, FAKE_TITLE } from './FakeData';

const hadleMount = (options = {}) => shallowMount(
  EpisodeListItem,
  initLocalVue(options, false),
);

describe('EpisodeListItem.vue', () => {
  let vm;
  let wrapper;
  afterEach(() => {
    sinon.restore();
  });

  it('test render', async () => {
    wrapper = hadleMount({ propsData: { episodeId: FAKE_EPISODE_ID } });
    ({ vm } = wrapper);
    sinon.assert.match(vm.localDate, '');

    const [fakeEpisode] = FAKE_EPISODES;
    wrapper.setProps({ ...fakeEpisode, episodeId: fakeEpisode.id });
    await vm.$nextTick();
    const titleEl = wrapper.find('.episode-title');
    sinon.assert.match(titleEl.text(), FAKE_TITLE);
  });

  it('test on click', async () => {
    const stubEmit = sinon.stub(vm, '$emit');
    const el = wrapper.find('.episode-list-item');
    el.trigger('click');
    sinon.assert.calledWith(stubEmit, 'click');
  });
});
