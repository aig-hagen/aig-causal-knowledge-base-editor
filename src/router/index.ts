import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/CausalKnowledgeBaseEditorView.vue'
import ArgumentationFrameworkEditorView from '@/views/ArgumentationFrameworkEditorView.vue'

const DEFAULT_TITLE = 'Causal Knowledge Base Editor'

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
      props: {},
      meta: { title: 'Argumentation Framework Editor' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  document.title = String(to.meta.title ?? DEFAULT_TITLE)
  next()
})

export default router
