import Parser from 'rss-parser';

class RssHelper {
  constructor() {
    this.parser = new Parser();
  }

  getRss(rssUrl) {
    return this.parser.parseURL(rssUrl);
  }

  static install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$rss = new RssHelper();
  }
}

export default RssHelper;
