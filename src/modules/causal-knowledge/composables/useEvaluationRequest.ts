/*
 * Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.
 *
 * Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import {
  type EvaluationRequestPayload,
  type Literal,
  NonEvaluableKnowledgebaseError,
  useEvaluationRequestPayload,
} from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'
import type { Connection, Id } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import { useFetch } from '@vueuse/core'
import { computed, type MaybeRef, ref, type Ref, unref, watchEffect } from 'vue'
import { ajv } from '@/modules/shared/ajvInstance'
import { TWEETY_API_URL } from '@/modules/common/server'
import type {
  AttackDTO,
  DialectialSequenceExplanationDTO,
} from '@/modules/sequence-explanation/composables/useSequenceExplanationRequest'

export function useConclusionEvaluationRequest(
  atoms: MaybeRef<Set<number>>,
  conjunctions: MaybeRef<Set<number>>,
  connections: MaybeRef<Connection[]>,
  observations: MaybeRef<Literal[]>,
  assumptions: MaybeRef<Literal[]>,
  conclusionsFilter: MaybeRef<Id[] | null>,
) {
  const payload = useEvaluationRequestPayload(
    atoms,
    conjunctions,
    connections,
    observations,
    assumptions,
    conclusionsFilter,
    'get_conclusions',
  )

  return useEvaluationRequest(payload, handleConclusionsReply)
}

export function handleConclusionsReply(reply: string) {
  if (!/^\[\]|\[(!?\d+)(,\s*(!?\d+))*\]$/.test(reply)) {
    console.error(`Could not parse reply ${reply}.`)
    return {
      result: null,
      error: 'Unexpected evaluation reply.',
    }
  }

  const literalStrings = reply
    .slice(1, -1)
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
  const conclusions = []
  for (const literalString of literalStrings) {
    let negated
    let atomIdString
    if (literalString.startsWith('!')) {
      negated = true
      atomIdString = literalString.slice(1)
    } else {
      negated = false
      atomIdString = literalString
    }
    const atomId = parseInt(atomIdString, 10)
    conclusions.push({ atomId, negated })
  }

  return {
    result: conclusions,
    error: null,
  }
}

export function useExplanationEvaluationRequest(
  atoms: MaybeRef<Set<number>>,
  conjunctions: MaybeRef<Set<number>>,
  connections: MaybeRef<Connection[]>,
  observations: MaybeRef<Literal[]>,
  assumptions: MaybeRef<Literal[]>,
  conclusionsFilter: MaybeRef<Id[] | null>,
) {
  const payload = useEvaluationRequestPayload(
    atoms,
    conjunctions,
    connections,
    observations,
    assumptions,
    conclusionsFilter,
    'get_significant_atoms',
  )
  return useEvaluationRequest(payload, handleExplanationReply)
}

export function useSequenceExplanationEvaluationRequest(
  atoms: MaybeRef<Set<number>>,
  conjunctions: MaybeRef<Set<number>>,
  connections: MaybeRef<Connection[]>,
  observations: MaybeRef<Literal[]>,
  assumptions: MaybeRef<Literal[]>,
  conclusionsFilter: MaybeRef<Id[] | null>,
) {
  const payload = useEvaluationRequestPayload(
    atoms,
    conjunctions,
    connections,
    observations,
    assumptions,
    conclusionsFilter,
    'get_sequence_explanations',
  )
  return useEvaluationRequest(payload, handleSequenceExplanationReply)
}

const explanationReplySchema = {
  type: 'object',
  propertyNames: {
    pattern: '^\\d+$',
  },
  additionalProperties: {
    type: 'array',
    items: { type: 'string', pattern: '^\\d+$' },
  },
}

const validateExplanationReply = ajv.compile(explanationReplySchema)

function handleExplanationReply(reply: string) {
  let replyObject
  try {
    replyObject = JSON.parse(reply)
  } catch (error) {
    console.error(`Unexpected explantion reply`, reply, error)
    return {
      result: null,
      error: 'Unexpected explantion reply.',
    }
  }

  const valid = validateExplanationReply(replyObject)
  if (valid) {
    const perAtomSignificantAtoms = new Map<number, number[]>()

    for (const atomIdString in replyObject) {
      const significantAtomIdStrings = replyObject[atomIdString]
      const atomId = parseInt(atomIdString, 10)
      for (const significantAtomIdString of significantAtomIdStrings) {
        let significantAtomIds = perAtomSignificantAtoms.get(atomId)
        if (significantAtomIds === undefined) {
          significantAtomIds = []
          perAtomSignificantAtoms.set(atomId, significantAtomIds)
        }
        const significantAtomId = parseInt(significantAtomIdString, 10)
        significantAtomIds.push(significantAtomId)
      }
    }

    return {
      result: perAtomSignificantAtoms,
      error: null,
    }
  } else {
    console.error(`Unexpected explantion reply`, replyObject, validateExplanationReply.errors)
    return {
      result: null,
      error: 'Unexpected explantion reply.',
    }
  }
}

const sequenceExplanationReplySchema = {
  definitions: {
    Argument: {
      type: 'string',
    },
    AttackDTO: {
      type: 'object',
      properties: {
        attacker: { $ref: '#/definitions/Argument' },
        attacked: { $ref: '#/definitions/Argument' },
      },
      required: ['attacker', 'attacked'],
      additionalProperties: false,
    },
    DialectialSequenceExplanationDTO: {
      type: 'object',
      properties: {
        argument: { $ref: '#/definitions/Argument' },
        supporters: {
          type: 'array',
          items: {
            type: 'array',
            items: { $ref: '#/definitions/Argument' },
          },
        },
        defeated: {
          type: 'array',
          items: {
            type: 'array',
            items: { $ref: '#/definitions/Argument' },
          },
        },
      },
      required: ['argument', 'supporters', 'defeated'],
      additionalProperties: false,
    },
  },
  type: 'object',
  properties: {
    attacks: {
      type: 'array',
      items: { $ref: '#/definitions/AttackDTO' },
    },
    perAtomSequenceExplanations: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { $ref: '#/definitions/DialectialSequenceExplanationDTO' },
      },
    },
  },
  required: ['attacks', 'perAtomSequenceExplanations'],
  additionalProperties: false,
}

const validateSequenceExplanationReply = ajv.compile(sequenceExplanationReplySchema)

export interface SequenceExplanationReply {
  attacks: AttackDTO[]
  perAtomSequenceExplanations: Record<string, DialectialSequenceExplanationDTO[]>
}

function handleSequenceExplanationReply(reply: string): ResultOrError<SequenceExplanationReply> {
  let replyObject
  try {
    replyObject = JSON.parse(reply)
  } catch (error) {
    console.error(`Unexpected sequence explantion reply`, reply, error)
    return {
      result: null,
      error: 'Unexpected sequence explantion reply.',
    }
  }

  const valid = validateSequenceExplanationReply(replyObject)

  if (!valid) {
    console.error(
      `Unexpected sequence explantion reply`,
      replyObject,
      validateSequenceExplanationReply.errors,
    )
    return {
      result: null,
      error: 'Unexpected evaluation reply.',
    }
  }

  return {
    result: replyObject as SequenceExplanationReply,
    error: null,
  }
}

interface ResultOrError<ResultT> {
  result: ResultT | null
  error: string | null
}

export function useEvaluationRequest<ResultT>(
  payload: MaybeRef<EvaluationRequestPayload | NonEvaluableKnowledgebaseError>,
  handleReply: (reply: string) => ResultOrError<ResultT>,
) {
  const url = TWEETY_API_URL + '/causal'

  const evaluationBlocker: Ref<Error | null> = computed(() => {
    const payloadValue = unref(payload)
    if (payloadValue instanceof NonEvaluableKnowledgebaseError) {
      return payloadValue
    } else {
      return null
    }
  })

  const evaluationError: Ref<string | null> = ref(null)

  const evaluationResult: Ref<ResultT | null> = ref(null)

  const { error, data, abort, canAbort, execute, isFetching, isFinished } = useFetch(url, {
    immediate: false,
  }).post(payload, 'json')

  const evaluate = computed(() => {
    if (isFetching.value || evaluationBlocker.value !== null) {
      return null
    } else {
      return () => {
        watchHandleResponseEffect.resume()
        void execute()
      }
    }
  })

  const abortEvaluation = computed(() => {
    if (canAbort.value) {
      return abort
    } else {
      return null
    }
  })

  const isEvaluating = computed(() => isFetching.value)

  const watchHandleResponseEffect = watchEffect(() => {
    if (error.value) {
      evaluationError.value = 'Evaluation failed: ' + String(error.value)
      evaluationResult.value = null
    } else if (isFinished.value) {
      const { error, result } = handleReponseData(data.value, handleReply)
      evaluationError.value = error
      evaluationResult.value = result
    } else {
      evaluationError.value = null
      evaluationResult.value = null
    }
  })

  watchEffect(() => {
    watchHandleResponseEffect.pause()
    const payloadValue = unref(payload)
    if (payloadValue instanceof NonEvaluableKnowledgebaseError) {
      abort()
      evaluationError.value = null
      evaluationResult.value = null
    } else {
      abort()
      evaluationError.value = null
      evaluationResult.value = null
    }
  })

  return {
    evaluationBlocker,
    evaluate,
    isEvaluating,
    evaluationError,
    evaluationResult,
    abortEvaluation,
  }
}

function handleReponseData<ResultT>(
  data: unknown,
  handleReply: (reply: string) => {
    result: ResultT | null
    error: string | null
  },
): {
  result: ResultT | null
  error: string | null
} {
  let dataObject

  if (typeof data !== 'string') {
    console.error(`Unexpected response: ${String(data)}`)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
    }
  }

  try {
    dataObject = JSON.parse(data)
  } catch (error) {
    console.error(`Unexpected response: ${data}`, error)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
    }
  }

  if (typeof dataObject !== 'object') {
    console.error(`Unexpected response: ${data}`)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
    }
  }

  if (dataObject.status === 'TIMEOUT') {
    return {
      result: null,
      error: 'Evaluation timed out.',
    }
  }

  if (dataObject.status !== 'SUCCESS') {
    console.error(`Unexpected status ${String(dataObject.status)}.`)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
    }
  }

  const reply = dataObject.reply
  if (typeof reply !== 'string') {
    console.error(`Could not parse reply ${String(reply)}.`)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
    }
  }

  return handleReply(reply)
}
