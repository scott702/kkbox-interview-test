import Parser from 'rss-parser';
import { RSS_ENDPOINT } from './constants';

console.log(RSS_ENDPOINT);
console.log(process.env);

class RssHelper {
  constructor() {
    this.parser = new Parser();
  }

  getRss(rssId) {
    return this.parser.parseURL(`${RSS_ENDPOINT}/${rssId}.xml`);
    // return this.parser.parseURL('https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml');
  }

  static install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$rss = new RssHelper();
  }
}

export default RssHelper;
