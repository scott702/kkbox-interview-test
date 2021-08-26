import VueRouter from 'vue-router';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { cloneDeep } from 'lodash';
import { Slider, Breadcrumb } from 'ant-design-vue';
import router from '@/router';
import episode from '@/store/episode';
import player from '@/store/player';

function initLocalVue(custObj = {}, useRouter = true) {
  const localVue = createLocalVue();

  if (useRouter) {
    localVue.use(VueRouter);
  }
  localVue.use(Vuex);
  localVue.use(Slider);
  localVue.use(Breadcrumb);

  const localVueObj = {
    localVue,
    store: new Vuex.Store(cloneDeep({
      modules: {
        episode,
        player,
      },
    })),
    ...custObj,
  };
  if (useRouter) {
    localVueObj.router = router;
  }
  return localVueObj;
}

export default initLocalVue;
