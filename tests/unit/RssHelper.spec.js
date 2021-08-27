import sinon from 'sinon';
import flushPromise from 'flush-promises';
import { RSS_ENDPOINT } from '@/scripts/constants';
import { FAKE_ID } from './FakeData';
import RssHelper from '@/scripts/RssHelper';

describe('RssHelper.js', () => {
  const rss = new RssHelper();
  const stubParse = sinon.stub();
  rss.parser = {
    parseURL: stubParse,
  };
  afterEach(() => {
    sinon.restore();
    stubParse.reset();
  });

  it('test getRss', async () => {
    rss.getRss(FAKE_ID);
    await flushPromise();
    sinon.assert.calledWith(stubParse, `${RSS_ENDPOINT}/${FAKE_ID}.xml`);
  });

  it('Should able to register Vue prototype', () => {
    const fakeVue = sinon.fake();
    RssHelper.install(fakeVue);
    sinon.assert.match(fakeVue.prototype.$rss, sinon.match.object);
  });
});
