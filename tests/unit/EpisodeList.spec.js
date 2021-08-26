import sinon from 'sinon';
import { mount } from '@vue/test-utils';
import EpisodeList from '@/components/EpisodeList.vue';
import EpisodeListItem from '@/components/EpisodeListItem.vue';
import initLocalVue from './LocalVue';
import { FAKE_EPISODES, FAKE_EPISODE_ID } from './FakeData';

const hadleMount = (options = {}) => mount(
  EpisodeList,
  initLocalVue(options, false),
);

describe('EpisodeList.vue', () => {
  let vm;
  let wrapper;
  let $router;
  const stubPush = sinon.stub();
  beforeEach(() => {
    $router = { push: stubPush };
  });

  afterEach(() => {
    sinon.restore();
    stubPush.reset();
  });

  it('test render EpisodeListItem', async () => {
    wrapper = hadleMount({ mocks: { $router } });
    ({ vm } = wrapper);
    let itemComp = wrapper.findComponent(EpisodeListItem);
    sinon.assert.match(itemComp.exists(), false);

    wrapper.setProps({ items: FAKE_EPISODES });
    await vm.$nextTick();
    itemComp = wrapper.findComponent(EpisodeListItem);
    sinon.assert.match(itemComp.exists(), true);
  });

  it('test click EpisodeListItem', () => {
    const itemComp = wrapper.findComponent(EpisodeListItem);
    itemComp.trigger('click');
    sinon.assert.calledWith(stubPush, {
      name: 'Episode',
      params: { id: FAKE_EPISODE_ID },
    });
  });
});
