console.log(process.env);

// eslint-disable-next-line import/prefer-default-export
export const {
  VUE_APP_RSS_ENDPOINT: RSS_ENDPOINT,
} = process.env;

export const PLAYER_STATE = {
  PLAY: 'play',
  PAUSE: 'pause',
};
