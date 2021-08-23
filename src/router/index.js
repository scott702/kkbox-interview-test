import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Episode from '@/views/Episode.vue';
import { ROUTE_NAME } from '@/scripts/constants';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    component: Home,
  },
  {
    path: '/episode/:id',
    name: ROUTE_NAME.EPISODE,
    component: Episode,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
