import { createRouter, createWebHistory } from 'vue-router'
import CausalKnowledgeBaseEditorView from '@/views/CausalKnowledgeBaseEditorView.vue'
import ArgumentationFrameworkEditorView from '@/views/ArgumentationFrameworkEditorView.vue'

const TITLE_KEY = 'title'

export const NAV_SHOW_USERGUIDE_KEY = 'navShowUserGuide'
export const EDITOR_TYPE_CAUSAL = 'causal'

export const NAV_MORE_NAME_KEY = 'navMoreName'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CausalKnowledgeBaseEditorView,
      props: { previewFeatures: false },
      meta: {
        [TITLE_KEY]: 'Causal Knowledge Base Editor',
        [NAV_MORE_NAME_KEY]: 'Causal Knowledge Base Editor',
        [NAV_SHOW_USERGUIDE_KEY]: true,
      },
    },
    {
      path: '/causal-knowledge-base-preview',
      name: 'causal-knowledge-base-preview',
      component: CausalKnowledgeBaseEditorView,
      props: { previewFeatures: true },
      meta: {
        [TITLE_KEY]: 'Causal Knowledge Base Editor',
        [NAV_MORE_NAME_KEY]: 'Causal Knowledge Base Editor (with preview features)',
        [NAV_SHOW_USERGUIDE_KEY]: true,
      },
    },
    {
      path: '/argumentation-framework',
      name: 'argumentation-framework',
      component: ArgumentationFrameworkEditorView,
      props: {},
      meta: {
        [TITLE_KEY]: 'Argumentation Framework Editor',
        [NAV_MORE_NAME_KEY]: 'Argumentation Framework Editor',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const title = to.meta[TITLE_KEY]
  if (typeof title !== 'string') {
    throw Error('Invalid title.')
  }
  document.title = title
  next()
})

export default router
