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
    setPlayingData(state, playingData) {
      state.playingData = playingData;
    },
    resetPlayerState(state) {
      // state.isPlying = false;
      // state.playerState = null;
      Object.assign(state, defaultState());
    },
  },
  actions: {
    // handleNewPlay({ commit, dispatch }, data) {
    //   commit('setPlayingData', data);
    //   dispatch('handlePlay');
    // },
    handlePlayState({ commit }) {
      commit('setPlayerState', PLAYER_STATE.PLAY);
    },
    handlePauseState({ commit }) {
      commit('setPlayerState', PLAYER_STATE.PAUSE);
    },
    togglePlayerState({ commit, state }) {
      if (state.playerState === PLAYER_STATE.PLAY) {
        commit('setPlayerState', PLAYER_STATE.PAUSE);
        return;
      }
      commit('setPlayerState', PLAYER_STATE.PLAY);
    },
  },
};
