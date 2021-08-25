import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'vue-loading-overlay/dist/vue-loading.css';

library.add(faSpinner, faPause, faPlay);
Vue.component('font-awesome-icon', FontAwesomeIcon);
