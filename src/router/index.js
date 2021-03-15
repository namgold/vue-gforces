import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomepageView'),
      children: [
      ],
    },
    {
      path: '/books',
      component: () => import('@/views/BookView'),
      children: [
      ],
    },
    {
      path: '/*',
      component: () => import('@/views/404View'),
      children: [
      ],
    },
  ],
  mode: 'history',
});
