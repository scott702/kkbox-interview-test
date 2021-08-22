import Vue from 'vue';

const defaultState = () => ({
  episodes: [],
  currEpisodeId: '',
  // onEpisodePage: '',
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    currEpisode: (state) => {
      if (!state.currEpisodeId) {
        return {};
      }
      const episode = state.episodes.find((ep) => ep.guid === state.currEpisodeId);
      return episode || {};
    },
  },
  mutations: {
    setEpisodes(state, episodes) {
      state.episodes = episodes;
    },
    setCurrEpisodeId(state, episodeId) {
      state.currEpisodeId = episodeId;
    },
    // setPlayEpisodeId(state, episodeId) {
    //   state.currPlayEpisodeId = episodeId;
    // },
    // setOnEpisodePage(state, )
  },
  actions: {
    async fetchEpisodes({ commit }, rssId) {
      let res;
      try {
        res = await Vue.prototype.$rss.getRss(rssId);
      } catch (error) {
        console.log(error);
      }

      if (!res) {
        return {};
      }
      console.log(res);

      commit('setEpisodes', res.items);
      return res;
    },
  },
};
