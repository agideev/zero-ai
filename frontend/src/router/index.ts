import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

import ChatView from '../views/ChatView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'chat',
    component: ChatView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
