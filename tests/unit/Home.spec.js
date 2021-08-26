import sinon from 'sinon';
import { shallowMount } from '@vue/test-utils';
import flushPromise from 'flush-promises';
import Home from '@/views/Home.vue';
import initLocalVue from './LocalVue';
import RssHelper from '@/scripts/RssHelper';
import { FAKE_ID, FAKE_DATA } from './FakeData';
import episode from '@/store/episode';

describe('Home.vue', () => {
  const mount = (options = {}) => shallowMount(
    Home,
    initLocalVue({
      ...{ propsData: { rssId: FAKE_ID } }, ...options,
    }),
  );

  let vm;
  afterEach(() => {
    sinon.restore();
  });
  it('test mount', async () => {
    const stubRss = sinon.stub(RssHelper.prototype, 'getRss').resolves(FAKE_DATA);
    const stubShow = sinon.stub();
    const stubHide = sinon.stub();
    ({ vm } = mount({
      mocks: {
        $loading: {
          show: stubShow.returns({
            hide: stubHide,
          }),
        },
      },
    }));

    await flushPromise();
    sinon.assert.calledWith(stubRss, FAKE_ID);
    sinon.assert.calledOnce(stubShow);
    sinon.assert.calledOnce(stubHide);
    sinon.assert.match(vm.channelInfo.title, FAKE_DATA.title);
    sinon.assert.match(vm.channelInfo.image, FAKE_DATA.image.url);
    sinon.assert.match(vm.channelInfo.author, FAKE_DATA.itunes.author);
    const expected = FAKE_DATA.items.map((item) => ({
      title: item.title,
      image: item.itunes.image,
      publishDate: item.isoDate,
      duration: item.itunes.duration,
      id: item.guid,
    }));
    sinon.assert.match(vm.episodesList, expected);
    stubShow.reset();
    stubHide.reset();
  });

  it('test fetchData failed', async () => {
    const fakeError = new Error('fake error');
    const stubShow = sinon.stub();
    const stubHide = sinon.stub();
    sinon.stub(episode.actions, 'fetchEpisodes').rejects(fakeError);

    ({ vm } = mount({
      mocks: {
        $loading: {
          show: stubShow.returns({
            hide: stubHide,
          }),
        },
      },
    }));

    await flushPromise();

    sinon.assert.match(vm.channelInfo.title, '');
    sinon.assert.match(vm.channelInfo.image, '');
    sinon.assert.match(vm.channelInfo.author, '');
    sinon.assert.match(vm.episodesList, []);
  });
});
