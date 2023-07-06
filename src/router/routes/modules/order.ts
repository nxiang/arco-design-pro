import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '订单管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 3,
  },
  children: [
    {
      path: 'order-manage',
      name: 'order-manage',
      component: () => import('@/views/order/order-manage/index.vue'),
      meta: {
        locale: '订单管理',
        requiresAuth: true,
      },
    },
  ],
};

export default DASHBOARD;
