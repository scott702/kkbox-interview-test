import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueLoading from 'vue-loading-overlay';
import App from './App.vue';
import router from './router';
import store from './store';
import RssHelper from '@/scripts/RssHelper';
import 'vue-loading-overlay/dist/vue-loading.css';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(RssHelper);
Vue.use(VueLoading);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
