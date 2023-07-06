import { PAGE_LOAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/bind',
  name: 'bind',
  component: PAGE_LOAYOUT,
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      path: '1688-bind',
      name: '1688-bind',
      component: () => import('@/views/bind/1688-bind/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
};

export default DASHBOARD;
