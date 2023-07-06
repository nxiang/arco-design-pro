import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/start-distribution-goods',
  name: 'start-distribution-goods',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '开始铺货',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'link',
      name: 'distribution-goods-link',
      component: () =>
        import('@/views/start-distribution-goods/link/index.vue'),
      meta: {
        locale: '链接上货',
        requiresAuth: true,
      },
    },
  ],
};

export default DASHBOARD;
