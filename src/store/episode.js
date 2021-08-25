import RssHelper from '@/scripts/RssHelper';

const rss = new RssHelper();

const defaultState = () => ({
  episodes: [],
  currEpisodeId: '',
  episodeName: '',
  episodeAuthor: '',
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
    prevNextEpisodeIds: (state) => {
      const res = {
        prev: null,
        next: null,
      };
      if (!state.currEpisodeId) {
        return res;
      }

      const epIdx = state.episodes.findIndex((ep) => ep.guid === state.currEpisodeId);
      if (epIdx === -1) {
        return res;
      }

      if (epIdx + 1 < state.episodes.length) {
        res.prev = state.episodes[epIdx + 1].guid;
      }

      if (epIdx - 1 >= 0) {
        res.next = state.episodes[epIdx - 1].guid;
      }

      return res;
    },
  },
  mutations: {
    setEpisodes(state, episodes) {
      state.episodes = episodes;
    },
    setEpisodeName(state, name) {
      state.episodeName = name;
    },
    setEpisodeAuthor(state, name) {
      state.episodeAuthor = name;
    },
    setCurrEpisodeId(state, episodeId) {
      state.currEpisodeId = episodeId;
    },
    resetEpisodeState(state) {
      Object.assign(state, defaultState());
    },
  },
  actions: {
    async fetchEpisodes({ commit }, rssId) {
      let res;
      try {
        res = await rss.getRss(rssId);
      } catch (error) {
        console.log(error);
      }

      if (!res) {
        return {};
      }

      commit('setEpisodes', res.items);
      commit('setEpisodeName', res.title);
      commit('setEpisodeAuthor', res.itunes.author);
      return res;
    },
  },
};
