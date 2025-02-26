import { computed, ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import type {
  ConnectionId,
  Atom,
  Conjunction,
  Connection,
  GraphicalCausalKnowledgeBase,
} from '@/model/graphicalCausalKnowledgeBase'

export const useKnowledgeBase = defineStore('knowledgeBase', () => {
  const atoms = ref(new Map<number, Atom>())
  const operators = ref(new Map<number, Conjunction>())
  const connections = ref(new Map<ConnectionId, Connection>())
  const knowledgeBaseExport: ComputedRef<GraphicalCausalKnowledgeBase> = computed(() => ({
    apiVersion: 'graphical/v1',
    atoms: [...atoms.value.values()],
    operators: [...operators.value.values()],
    connections: [...connections.value.values()],
  }))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function updatePositionData(graph: any) {
    for (const node of graph.nodes) {
      const atom = atoms.value.get(node.id)
      if (atom !== undefined) {
        atom.position.x = node.x
        atom.position.y = node.y
      }
      const operator = operators.value.get(node.id)
      if (operator !== undefined) {
        operator.position.x = node.x
        operator.position.y = node.y
      }
    }
  }

  return {
    atoms,
    operators,
    connections,
    knowledgeBaseExport,
    updatePositionData
  }
})
