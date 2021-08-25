import { PLAYER_STATE } from '@/scripts/constants';

const defaultState = () => ({
  isPlying: false,
  playerState: null,
  playingData: {},
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    setPlayerState(state, playerState) {
      state.playerState = playerState;
    },
    setPlayerStateToPlay(state) {
      state.playerState = PLAYER_STATE.PLAY;
    },
    setPlayerStateToPause(state) {
      state.playerState = PLAYER_STATE.PAUSE;
    },
    setPlayingData(state, playingData) {
      state.playingData = playingData;
    },
    resetPlayerState(state) {
      Object.assign(state, defaultState());
    },
  },
  actions: {
    togglePlayerState({ commit, state }) {
      if (state.playerState === PLAYER_STATE.PLAY) {
        commit('setPlayerStateToPause');
        return;
      }
      commit('setPlayerStateToPlay');
    },
  },
};
