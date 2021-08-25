export const FAKE_ID = 'fake id';
export const FAKE_EPISODE_ID = 'fake episode id';
export const FAKE_ITUNES = {
  author: 'fake author',
  image: 'fake image',
  duration: 10,
};
export const FAKE_TITLE = 'fake title';
export const FAKE_DATA = {
  title: FAKE_TITLE,
  image: {
    url: 'fake url',
  },
  itunes: { ...FAKE_ITUNES },
  items: [{
    title: `${FAKE_TITLE} 1`,
    itunes: { ...FAKE_ITUNES },
    isoDate: 'fake date',
    guid: FAKE_EPISODE_ID,
  }],
};
