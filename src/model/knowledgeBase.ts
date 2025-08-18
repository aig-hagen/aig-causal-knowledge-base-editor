import type { Atom, Connection, Id } from './graphicalCausalKnowledgeBase'

export interface KnowledgeBase {
  perIdAtoms: Map<Id, Atom>[]
  perIdOperators: Map<Id, Atom>[]
  perSourceIdPerTargetIdConnections: Map<Id, Map<Id, Connection>>
}
