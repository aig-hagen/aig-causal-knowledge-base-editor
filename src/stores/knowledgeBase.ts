import { computed, ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import type {
  Atom,
  Conjunction,
  Connection,
  ConnectionId,
  GraphicalCausalKnowledgeBase,
} from '@/model/graphicalCausalKnowledgeBase'
import schema from '@/assets/graphical-causal-knowledge-base-v1.schema.json' assert { type: 'json' }

import { ajv } from '@/ajvInstance'
import { hasMoreThenOneEntry } from '@/util/types'

export abstract class ImportError {
  abstract message: string
}
export class JsonSyntaxError extends ImportError {
  message: string
  constructor(cause: string, fileName: string) {
    super()
    this.message = `The provided file \`${fileName}\` is not a valid JSON file: ${cause}`
  }
}

export class SchemaMismatchError extends ImportError {
  message: string
  constructor(cause: string) {
    super()
    // The `cause` will already contain a file name
    this.message = `Data does not match the expected schema: ${cause}`
  }
}

export class InvalidDataError extends ImportError {
  message: string
  constructor(cause: string, fileName: string) {
    super()
    this.message = `The provided file \`${fileName}\` contains invalid data: ${cause}`
  }
}

function atomIdToMessageString(atomId: number): string {
  return `\`${atomId.toString()}\``
}

export function getConnectionKey(connnectionId: ConnectionId): string {
  return `${connnectionId.sourceId.toString()}-${connnectionId.targetId.toString()}`
}

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

  function validateIds(data: GraphicalCausalKnowledgeBase, fileName: string): ImportError[] {
    const idErrors: ImportError[] = []

    const byIdAtoms = new Map<number, Atom[]>()
    for (const atom of data.atoms) {
      let atoms = byIdAtoms.get(atom.id)
      if (atoms === undefined) {
        atoms = []
        byIdAtoms.set(atom.id, atoms)
      }
      atoms.push(atom)
    }

    const byIdOperators = new Map<number, Conjunction[]>()
    for (const operator of data.operators) {
      let operators = byIdOperators.get(operator.id)
      if (operators === undefined) {
        operators = []
        byIdOperators.set(operator.id, operators)
      }
      operators.push(operator)
    }

    const idsOfAtomsAndOperators = new Set<number>([...byIdAtoms.keys(), ...byIdOperators.keys()])
    for (const id of idsOfAtomsAndOperators) {
      const atoms = byIdAtoms.get(id) ?? []
      const operators = byIdOperators.get(id) ?? []
      if (atoms.length + operators.length > 1) {
        const error = new InvalidDataError(
          `Multiple atoms or operators with the ID ${atomIdToMessageString(id)} exist.`,
          fileName,
        )
        idErrors.push(error)
      }
    }

    const byIdConnections = new Map<string, Connection[]>()
    for (const connection of data.connections) {
      const key = getConnectionKey(connection.id)
      let connections = byIdConnections.get(key)
      if (connections === undefined) {
        connections = []
        byIdConnections.set(key, connections)
      }
      connections.push(connection)
    }

    for (const connections of byIdConnections.values()) {
      if (hasMoreThenOneEntry(connections)) {
        const connectionId = connections[0].id
        const error = new InvalidDataError(
          `Multiple connections from the source ${atomIdToMessageString(connectionId.sourceId)} to the target ${atomIdToMessageString(connectionId.targetId)} exist.`,
          fileName,
        )
        idErrors.push(error)
      }
    }

    for (const connection of data.connections) {
      if (!byIdAtoms.has(connection.id.sourceId) && !byIdOperators.has(connection.id.sourceId)) {
        const error = new InvalidDataError(
          `A connection's source ID ${atomIdToMessageString(connection.id.sourceId)} does not exist.`,
          fileName,
        )
        idErrors.push(error)
      }
      if (!byIdAtoms.has(connection.id.targetId) && !byIdOperators.has(connection.id.targetId)) {
        const error = new InvalidDataError(
          `A connection's target ID ${atomIdToMessageString(connection.id.targetId)} does not exist.`,
          fileName,
        )
        idErrors.push(error)
      }
    }

    return idErrors
  }

  function importKnowledgeBase(fileName: string, content: string): ImportError[] {
    let data: GraphicalCausalKnowledgeBase
    try {
      data = JSON.parse(content)
    } catch (e) {
      return [new JsonSyntaxError((e as Error).message, fileName)]
    }
    const valid = validate(data)
    if (!valid) {
      const errors = validate.errors
      if (errors === undefined || errors === null || errors.length === 0) {
        throw new Error('The validation failed, but unexpectedly did not provide any errors.')
      }
      return errors.map((error) => {
        const message = ajv.errorsText([error], { dataVar: fileName })
        return new SchemaMismatchError(message)
      })
    }

    const idErrors: ImportError[] = validateIds(data, fileName)

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

export function getDisplayName(atom: Atom, negated: boolean): string {
  const idString = String(atom.id)
  const displayName = atom.name.length == 0 ? `unnamed[id=${idString}]` : atom.name

  if (negated) {
    return `not ${displayName}`
  } else {
    return displayName
  }
}

export function getAssumptions(atom: Atom): boolean[] {
  if (atom.assumption === undefined) {
    throw new Error(`Assumption should not be undefined for atom with id ${String(atom.id)}.`)
  }
  let binaryAssumptions = []
  if ([4, 5].includes(atom.assumption)) {
    binaryAssumptions = [true]
  } else if ([1, 2].includes(atom.assumption)) {
    binaryAssumptions = [false]
  } else {
    binaryAssumptions = [true, false]
  }
  return binaryAssumptions
}
