import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/source-goods',
  name: 'source-goods',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '货源管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: '1688',
      name: 'source-goods-1688',
      component: () => import('@/views/source-goods/1688/index.vue'),
      // component: () => import('@/views/source-goods/1688/jsx.vue'),
      meta: {
        locale: '1688货源',
        requiresAuth: true,
      },
    },
    // {
    //   path: 'kxg',
    //   name: 'source-goods-kxg',
    //   component: () => import('@/views/source-goods/kxg/index.vue'),
    //   meta: {
    //     locale: '开心果货源',
    //     requiresAuth: true,
    //   },
    // },
  ],
};

export default DASHBOARD;
