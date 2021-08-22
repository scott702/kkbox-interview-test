import Vue from 'vue';
import Vuex from 'vuex';
import episode from './episode';
import player from './player';

console.log(player);
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player,
    episode,
  },
  strict: true,
});
