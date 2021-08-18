import Vue from 'vue';

const defaultState = () => ({
  episodes: [],
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    setEpisodes(state, episodes) {
      state.episodes = episodes;
    },
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
