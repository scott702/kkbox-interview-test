import Vue from 'vue';
import Vuex from 'vuex';
import episode from './episode';

console.log(episode);
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    episode,
  },
  strict: true,
});
