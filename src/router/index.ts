import { createRouter, createWebHistory } from 'vue-router'
import CausalKnowledgeBaseEditorView from '@/views/CausalKnowledgeBaseEditorView.vue'
import ArgumentationFrameworkEditorView from '@/views/ArgumentationFrameworkEditorView.vue'
import ThirdPartyLicensesView from '@/thirdPartyLicenses/ThirdPartyLicensesView.vue'

const TITLE_KEY = 'title'

export const NAV_SHOW_USERGUIDE_KEY = 'navShowUserGuide'
export const EDITOR_TYPE_CAUSAL = 'causal'

export const NAV_MORE_NAME_KEY = 'navMoreName'

const CAUSAL_KNOWLEDGE_BASE_EDITOR_TITLE = 'Causal Knowledge Base Editor'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CausalKnowledgeBaseEditorView,
      props: { previewFeatures: false },
      meta: {
        [TITLE_KEY]: CAUSAL_KNOWLEDGE_BASE_EDITOR_TITLE,
        [NAV_MORE_NAME_KEY]: CAUSAL_KNOWLEDGE_BASE_EDITOR_TITLE,
        [NAV_SHOW_USERGUIDE_KEY]: true,
      },
    },
    {
      path: '/third-party-licenses',
      name: 'third-party-licenses',
      component: ThirdPartyLicensesView,
      meta: {
        [TITLE_KEY]: 'Third-Party Licenses',
      },
    },
    {
      path: '/causal-knowledge-base-preview',
      name: 'causal-knowledge-base-preview',
      component: CausalKnowledgeBaseEditorView,
      props: { previewFeatures: true },
      meta: {
        [TITLE_KEY]: CAUSAL_KNOWLEDGE_BASE_EDITOR_TITLE,
        [NAV_MORE_NAME_KEY]: `${CAUSAL_KNOWLEDGE_BASE_EDITOR_TITLE} (with preview features)`,
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
  let title = to.meta[TITLE_KEY]
  if (typeof title !== 'string') {
    title = CAUSAL_KNOWLEDGE_BASE_EDITOR_TITLE
  }
  document.title = title as string
  next()
})

export default router
