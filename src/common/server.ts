const editorCommit = import.meta.env.VITE_EDITOR_COMMIT?.slice(0, 7)
const editorVersion = import.meta.env.VITE_EDITOR_VERSION

export let USER_ID = 'causal-knowledge-base-editor.aig.fernuni-hagen.de'

if (editorVersion !== undefined) {
  USER_ID = USER_ID + '/' + editorVersion
}

if (editorCommit !== undefined) {
  USER_ID = USER_ID + ' ' + editorCommit
}

export const TWEETY_API_URL = import.meta.env.VITE_TWEETY_API_URL
