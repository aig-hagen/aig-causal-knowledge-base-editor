import { computed, ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import type {
  Atom,
  Conjunction,
  Connection,
  ConnectionId,
  GraphicalCausalKnowledgeBase,
} from '@/model/graphicalCausalKnowledgeBase'
import Ajv from 'ajv'
import schema from '@/assets/graphical-causal-knowledge-base-v1.schema.json'

export abstract class ImportError {
  abstract message: string
}
export class JsonSyntaxError extends ImportError {
  message: string
  constructor(cause: string) {
    super()
    this.message = `The provided file is not a valid JSON file: ${cause}`
  }
}

export class SchemaMismatchError extends ImportError {
  message: string
  constructor(public cause: string) {
    super()
    this.message = `The provided file does not match the expected schema: ${cause}`
  }
}

export class InvalidDataError extends ImportError {
  message: string
  constructor(public cause: string) {
    super()
    this.message = `The provided file contains invalid data: ${cause}`
  }
}

export function getConnectionKey(connnectionId: ConnectionId): string {
  return `${connnectionId.sourceId}-${connnectionId.targetId}`
}

const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile<GraphicalCausalKnowledgeBase>(schema)

export const useKnowledgeBase = defineStore('knowledgeBase', () => {
  const atoms = ref(new Map<number, Atom>())
  const operators = ref(new Map<number, Conjunction>())
  const connections = ref(new Map<string, Connection>())
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

  function validateIds(data: GraphicalCausalKnowledgeBase): ImportError[] {
    const idErrors: ImportError[] = []

    const byIdAtoms = new Map<number, Atom[]>()
    for (const atom of data.atoms) {
      if (!byIdAtoms.has(atom.id)) {
        byIdAtoms.set(atom.id, [])
      }
      byIdAtoms.get(atom.id)!.push(atom)
    }

    const byIdOperators = new Map<number, Conjunction[]>()
    for (const operator of data.operators) {
      if (!byIdOperators.has(operator.id)) {
        byIdOperators.set(operator.id, [])
      }
      byIdOperators.get(operator.id)!.push(operator)
    }

    const idsOfAtomsAndOperators = new Set<number>([...byIdAtoms.keys(), ...byIdOperators.keys()])
    for (const id of idsOfAtomsAndOperators) {
      const atoms = byIdAtoms.get(id) ?? []
      const operators = byIdOperators.get(id) ?? []
      if (atoms.length + operators.length > 1) {
        const error = new InvalidDataError(
          `Multiple atoms or operators with the ID \`${id}\` exist.`,
        )
        idErrors.push(error)
      }
    }

    const byIdConnections = new Map<string, Connection[]>()
    for (const connection of data.connections) {
      const key = getConnectionKey(connection.id)
      if (!byIdConnections.has(key)) {
        byIdConnections.set(key, [])
      }
      byIdConnections.get(key)!.push(connection)
    }

    for (const connections of byIdConnections.values()) {
      if (connections.length > 1) {
        const error = new InvalidDataError(
          `Multiple connections from the source \`${connections[0].id.sourceId}\` to the target \`${connections[0].id.targetId}\` exist.`,
        )
        idErrors.push(error)
      }
    }

    for (const connection of data.connections) {
      if (!byIdAtoms.has(connection.id.sourceId) && !byIdOperators.has(connection.id.sourceId)) {
        const error = new InvalidDataError(
          `A connection's source ID \`${connection.id.sourceId}\` does not exist.`,
        )
        idErrors.push(error)
      }
      if (!byIdAtoms.has(connection.id.targetId) && !byIdOperators.has(connection.id.targetId)) {
        const error = new InvalidDataError(
          `A connection's target ID \`${connection.id.targetId}\` does not exist.`,
        )
        idErrors.push(error)
      }
    }

    return idErrors
  }

  function importKnowledgeBase(content: string): ImportError[] {
    let data: GraphicalCausalKnowledgeBase
    try {
      data = JSON.parse(content)
    } catch (e) {
      return [new JsonSyntaxError((e as Error).message)]
    }
    const valid = validate(data)
    if (!valid) {
      return validate.errors!.map((error) => {
        const message = [error.instancePath, error.message]
          .filter((part) => part !== undefined && part !== '')
          .join(' ')
        return new SchemaMismatchError(message)
      })
    }

    const idErrors: ImportError[] = validateIds(data)

    if (idErrors.length > 0) {
      return idErrors
    }

    // import data into store
    atoms.value.clear()
    for (const atom of data.atoms) {
      atoms.value.set(atom.id, atom)
    }
    operators.value.clear()
    for (const operator of data.operators) {
      operators.value.set(operator.id, operator)
    }
    connections.value.clear()
    for (const connection of data.connections) {
      connections.value.set(getConnectionKey(connection.id), connection)
    }
    return []
  }

  return {
    atoms,
    operators,
    connections,
    knowledgeBaseExport,
    updatePositionData,
    importKnowledgeBase,
  }
})
