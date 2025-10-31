import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: { previewFeatures: false },
    },
    {
      path: '/preview',
      name: 'preview',
      component: HomeView,
      props: { previewFeatures: true },
    },
  ],
})

export default router
