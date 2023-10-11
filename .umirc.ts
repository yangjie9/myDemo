import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: '虚拟列表',
      path: '/virtual',
      component: './VirtuallyDom',
    },
    {
      name: '测试列表',
      path: '/virtua-dom',
      component: './VirtuaDom',
    },
    {
      name: '无限加载',
      path: '/infinite-demo',
      component: './InfiniteDemo',
    },
    {
      name: '无限滚动',
      path: '/infinite-dom',
      component: './InfinitScroll',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'npm',
});
