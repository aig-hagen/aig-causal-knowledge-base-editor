import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/CausalKnowledgeBaseEditorView.vue'
import ArgumentationFrameworkEditorView from '@/views/ArgumentationFrameworkEditorView.vue'

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
    {
      path: '/argumentation-framework',
      name: 'argumentation-framework',
      component: ArgumentationFrameworkEditorView,
      props: { previewFeatures: false },
    },
  ],
})

export default router
