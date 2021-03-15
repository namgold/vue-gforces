import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Homepage'),
      children: [
      ],
    },
    {
      path: '/books',
      component: () => import('@/views/Book'),
      children: [
      ],
    },
    {
      path: '/*',
      component: () => import('@/views/404'),
      children: [
      ],
    },
  ],
  mode: 'history',
});
