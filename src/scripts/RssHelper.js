import Parser from 'rss-parser';
import { RSS_ENDPOINT } from './constants';

class RssHelper {
  constructor() {
    this.parser = new Parser();
  }

  getRss(rssId) {
    return this.parser.parseURL(`${RSS_ENDPOINT}/${rssId}.xml`);
  }

  static install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$rss = new RssHelper();
  }
}

export default RssHelper;
