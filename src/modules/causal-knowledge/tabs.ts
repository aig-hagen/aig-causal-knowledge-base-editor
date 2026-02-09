export const CAUSAL_MODAL_TAB = Symbol()
export const ARGUMENTATION_GRAPH_TAB = Symbol()
export const SEQUENCE_EXPLANATION_TAB = Symbol()

export type Tab =
  | typeof CAUSAL_MODAL_TAB
  | typeof ARGUMENTATION_GRAPH_TAB
  | typeof SEQUENCE_EXPLANATION_TAB
