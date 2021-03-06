export const {
  VUE_APP_RSS_ENDPOINT: RSS_ENDPOINT,
} = process.env;

export const ROUTE_NAME = {
  HOME: 'Home',
  EPISODE: 'Episode',
};

export const PLAYER_STATE = {
  PLAY: 'play',
  PAUSE: 'pause',
};

export const BREADCRUMB_CONFIG = {
  [ROUTE_NAME.EPISODE]: [ROUTE_NAME.EPISODE, ROUTE_NAME.HOME],
  [ROUTE_NAME.HOME]: [ROUTE_NAME.HOME],
};
