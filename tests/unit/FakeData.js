export const FAKE_ID = 'fake id';
export const FAKE_EPISODE_ID = 'fake episode id';
export const FAKE_ITUNES = {
  author: 'fake author',
  image: 'fake image',
  duration: 10,
};
export const FAKE_TITLE = 'fake title';
export const FAKE_URL = 'http://example.com';
export const FAKE_DATA = {
  title: FAKE_TITLE,
  image: {
    url: FAKE_URL,
  },
  itunes: { ...FAKE_ITUNES },
  items: [{
    title: `${FAKE_TITLE}1`,
    itunes: { ...FAKE_ITUNES },
    isoDate: '2021-08-14T07:34:18.000Z',
    guid: FAKE_EPISODE_ID,
    enclosure: {
      url: FAKE_URL,
    },
  }, {
    title: `${FAKE_TITLE}2`,
    itunes: { ...FAKE_ITUNES },
    isoDate: '2021-08-13T07:34:18.000Z',
    guid: `${FAKE_EPISODE_ID}2`,
    enclosure: {
      url: FAKE_URL,
    },
  }, {
    title: `${FAKE_TITLE}3`,
    itunes: { ...FAKE_ITUNES },
    isoDate: '2021-08-11T07:34:18.000Z',
    guid: `${FAKE_EPISODE_ID}3`,
    enclosure: {
      url: FAKE_URL,
    },
  }],
};

export const FAKE_EPISODES = [{
  image: 'fake image',
  title: FAKE_TITLE,
  publishDate: '2021-08-14T07:34:18.000Z',
  duration: '120',
  id: FAKE_EPISODE_ID,
}];

export const FAKE_NAME = 'fake name';
