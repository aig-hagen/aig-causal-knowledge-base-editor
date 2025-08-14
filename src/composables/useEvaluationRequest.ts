import {
  type EvaluationRequestPayload,
  type Literal,
  NonEvaluableKnowledgebaseError,
  useEvaluationRequestPayload,
} from '@/composables/useEvaluationRequestPayload'
import type { Connection } from '@/model/graphicalCausalKnowledgeBase'
import { useFetch } from '@vueuse/core'
import { computed, type MaybeRef, ref, type Ref, unref, watchEffect } from 'vue'
import { ajv } from '@/ajvInstance'

declare global {
  interface Window {
    TWEETY_API_URL: string
  }
}

export function useConclusionEvaluationRequest(
  atoms: MaybeRef<Set<number>>,
  conjunctions: MaybeRef<Set<number>>,
  connections: MaybeRef<Connection[]>,
  observations: MaybeRef<Literal[]>,
  assumptions: MaybeRef<Literal[]>,
) {
  const payload = useEvaluationRequestPayload(
    atoms,
    conjunctions,
    connections,
    observations,
    assumptions,
    'get_conclusions',
  )

  return useEvaluationRequest(payload, handleConclusionsReply)
}

function handleConclusionsReply(reply: string) {
  if (!/^\[\]|\[(!?\d+)(,\s*(!?\d+))*\]$/.test(reply)) {
    console.error(`Could not parse reply ${reply}.`)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
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
) {
  const payload = useEvaluationRequestPayload(
    atoms,
    conjunctions,
    connections,
    observations,
    assumptions,
    'get_significant_atoms',
  )
  return useEvaluationRequest(payload, handleExplanationReply)
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
      error: 'Unexpected evaluation result.',
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
      error: 'Unexpected evaluation result.',
    }
  }
}

export function useEvaluationRequest<ResultT>(
  payload: MaybeRef<EvaluationRequestPayload | NonEvaluableKnowledgebaseError>,
  handleReply: (reply: string) => {
    result: ResultT | null
    error: string | null
  },
) {
  const url = window.TWEETY_API_URL + '/causal'

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
