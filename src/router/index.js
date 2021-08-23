import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Episode from '@/views/Episode.vue';
import { ROUTE_NAME } from '@/scripts/constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    component: Home,
    meta: {
      breadcrumb: ROUTE_NAME.HOME,
    },
  },
  {
    path: '/episode/:id',
    name: ROUTE_NAME.EPISODE,
    component: Episode,
    meta: {
      breadcrumb() {
        const { name } = this.$route;
        return {
          label: name,
          parent: ROUTE_NAME.HOME,
        };
      },
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
