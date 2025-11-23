import { findCycle } from '@/model/cycles'
import type { Connection, ConnectionId, Id } from '@/model/graphicalCausalKnowledgeBase'
import { computed, unref, type ComputedRef, type MaybeRef } from 'vue'

const editorCommit = import.meta.env.VITE_EDITOR_COMMIT?.slice(0, 7)
const editorVersion = import.meta.env.VITE_EDITOR_VERSION

let USER_ID = 'causal-knowledge-base-editor.aig.fernuni-hagen.de'

if (editorVersion !== undefined) {
  USER_ID = USER_ID + '/' + editorVersion
}

if (editorCommit !== undefined) {
  USER_ID = USER_ID + ' ' + editorCommit
}

export interface Atom {
  id: number
}

export interface Literal {
  atomId: number
  negated: boolean
}

export function getLiteralString(literal: Literal): string {
  const idString = String(literal.atomId)
  if (literal.negated) {
    return `!${idString}`
  } else {
    return idString
  }
}

export function parseLiteralString(literal: string): Literal {
  const negated = literal.startsWith('!')
  const idString = negated ? literal.slice(1) : literal
  const id = parseInt(idString, 10)
  return { atomId: id, negated }
}

export class NonEvaluableKnowledgebaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NonEvaluableKnowledgebaseError'
  }
}

export class ConjunctionIsNotTargetedError extends NonEvaluableKnowledgebaseError {
  constructor(public connectionId: ConnectionId) {
    super(
      `The conjunction ${String(connectionId.sourceId)} targeting ${String(connectionId.targetId)} has no incomming edges.`,
    )
    this.name = 'ConjunctionIsNotTargetedError'
  }
}

export class CycleError extends NonEvaluableKnowledgebaseError {
  constructor(public cycle: number[]) {
    super(`Detected a cycle ${JSON.stringify(cycle)}.`)
    this.name = 'CycleError'
  }
}

export class EmptyKnowlegeBaseError extends NonEvaluableKnowledgebaseError {
  constructor() {
    super('The knowledge base is empty')
    this.name = 'EmptyKnowlegeBaseError'
  }
}

type EvaluationRequestPayloadCmd =
  | 'get_conclusions'
  | 'get_significant_atoms'
  | 'get_sequence_explanations'

export interface EvaluationRequestPayload {
  email?: string
  cmd: EvaluationRequestPayloadCmd
  kb: string
  observations: string
  conclusions_filter?: string
  timeout: number
  unit_timeout: string
}

export function useEvaluationRequestPayload(
  atoms: MaybeRef<Set<number>>,
  conjunctions: MaybeRef<Set<number>>,
  connections: MaybeRef<Connection[]>,
  observations: MaybeRef<Literal[]>,
  assumptions: MaybeRef<Literal[]>,
  conclusionsFilter: MaybeRef<Id[] | null>,
  cmd: EvaluationRequestPayloadCmd,
): ComputedRef<NonEvaluableKnowledgebaseError | EvaluationRequestPayload> {
  return computed(() => {
    return constructEvaluationRequestPayload(
      unref(atoms),
      unref(conjunctions),
      unref(connections),
      unref(observations),
      unref(assumptions),
      unref(conclusionsFilter),
      unref(cmd),
    )
  })
}

function constructEvaluationRequestPayload(
  atoms: Set<number>,
  conjunctions: Set<number>,
  connections: Connection[],
  observations: Literal[],
  assumptions: Literal[],
  conclusionsFilter: number[] | null,
  cmd: EvaluationRequestPayloadCmd,
): NonEvaluableKnowledgebaseError | EvaluationRequestPayload {
  const observationsPayload = observations.map(getLiteralString).join(', ')
  let equations
  let atomsUsedInRightSide
  try {
    ;({ equations, atomsUsedInRightSide } = constructEquations(atoms, conjunctions, connections))
  } catch (error) {
    if (error instanceof NonEvaluableKnowledgebaseError) {
      return error
    }
    throw error
  }
  const assumptionsPayload = assumptions
    .filter((literal) => atomsUsedInRightSide.has(literal.atomId))
    .map(getLiteralString)
    .join(', ')

  const conclusionsFilterPayload =
    conclusionsFilter === null ? undefined : conclusionsFilter.join(', ')

  return {
    email: USER_ID,
    cmd: cmd,
    kb: [...equations, `{${assumptionsPayload}}`].join('\n'),
    observations: observationsPayload,
    conclusions_filter: conclusionsFilterPayload,
    timeout: 300,
    unit_timeout: 's',
  }
}

function constructEquations(
  atoms: Set<number>,
  conjunctions: Set<number>,
  connections: Connection[],
): { equations: string[]; atomsUsedInRightSide: Set<number> } {
  if (atoms.size === 0) {
    throw new EmptyKnowlegeBaseError()
  }
  const atomsUsedInRightSide = new Set<number>()
  const perTargetIdConncections = new Map<number, Connection[]>()
  for (const connection of connections) {
    const targetId = connection.id.targetId
    let targetingConnections = perTargetIdConncections.get(targetId)
    if (targetingConnections === undefined) {
      targetingConnections = []
      perTargetIdConncections.set(targetId, targetingConnections)
    }
    targetingConnections.push(connection)
  }

  const cycle = findCycle(connections.map((connection) => connection.id))
  if (cycle !== null) {
    throw new CycleError(cycle)
  }
  function createrFormulaForSource(connection: Connection): string[] {
    const sourceId = connection.id.sourceId

    if (atoms.has(sourceId)) {
      atomsUsedInRightSide.add(sourceId)
      return [
        getLiteralString({
          atomId: sourceId,
          negated: connection.negated,
        }),
      ]
    }

    if (!conjunctions.has(sourceId)) {
      throw new Error(`Source ID ${String(sourceId)} is not an atom or conjunction.`)
    }
    const connectionsTargetingSource = perTargetIdConncections.get(sourceId)
    if (connectionsTargetingSource === undefined) {
      return []
    }
    const conjuncts = connectionsTargetingSource
      .map((connection) => createrFormulaForSource(connection))
      .join(' && ')

    if (connection.negated) {
      return [`!(${conjuncts})`]
    } else {
      return [`(${conjuncts})`]
    }
  }

  const equations = []
  for (const [target, connectionsToTarget] of perTargetIdConncections.entries()) {
    if (!atoms.has(target)) {
      continue
    }
    const disjuncts = connectionsToTarget.flatMap((connection) =>
      createrFormulaForSource(connection),
    )

    if (disjuncts.length === 0) {
      continue
    }

    const lefthandSide = getLiteralString({
      atomId: target,
      negated: false,
    })
    const righthandSide = disjuncts.join(' || ')
    const equation = `${lefthandSide} <=> ${righthandSide}`
    equations.push(equation)
  }

  return { equations, atomsUsedInRightSide }
}
