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
import { useFetch } from '@vueuse/core'
import { computed, type MaybeRef, ref, type Ref, unref, watchEffect } from 'vue'
import { TWEETY_API_URL, USER_ID } from '@/common/server'
import {
  getAttacks,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/argumentation/argumentationFramework'
import { GetSequenceExplanationsResult } from '@/sequence-explanation/GetSequenceExplanationsResult'

export abstract class SequenceExplanationRequestBlockingError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'NonArgumentationFrameworkError'
  }
}

export class NoAttacksError extends SequenceExplanationRequestBlockingError {
  constructor() {
    super()
    this.name = 'NoAttacksError'
  }
}

interface SequenceExplanationPost {
  email?: string
  timeout: number
  unit_timeout: string
  cmd: SequenceExplanationCmd
}

interface SequenceExplanationCmd {
  type: 'get_sequence_explanations'
  attacks: AttackDTO[]
  argument_filter?: string[]
}

export interface AttackDTO {
  attacker: ArgumentSerialized
  attacked: ArgumentSerialized
}

type ArgumentSerialized = string

export function useSequenceExplanationRequest(
  argumentationFramework: MaybeRef<ArgumentationFramework>,
  argumentFilter: MaybeRef<ArgumentId[] | null>,
) {
  const payload = computed<SequenceExplanationPost | SequenceExplanationRequestBlockingError>(
    () => {
      const attacks = getAttacks(unref(argumentationFramework))

      if (attacks.length === 0) {
        return new NoAttacksError()
      }
      const attacksDtos: AttackDTO[] = attacks.map(([attacker, attacked]) => ({
        attacker: attacker,
        attacked: attacked,
      }))
      const argumentFilterSerialized = unref(argumentFilter) ?? undefined
      return {
        email: USER_ID,
        timeout: 300,
        unit_timeout: 's',
        cmd: {
          type: 'get_sequence_explanations',
          attacks: attacksDtos,
          argument_filter: argumentFilterSerialized,
        },
      }
    },
  )

  return useEvaluationRequest(payload, handleSequenceExplanationReply)
}

export interface DialectialSequenceExplanationDTO {
  argument: ArgumentSerialized
  supporters: ArgumentSerialized[][]
  defeated: ArgumentSerialized[][]
}

function handleSequenceExplanationReply(
  reply: object,
): ResultOrError<GetSequenceExplanationsResult> {
  const result = GetSequenceExplanationsResult.safeParse(reply)
  if (!result.success) {
    console.error(result.error)
    return {
      result: null,
      error: 'Unexpected evaluation reply.',
    }
  } else {
    return {
      result: result.data,
      error: null,
    }
  }
}

interface ResultOrError<ResultT> {
  result: ResultT | null
  error: string | null
}

export function useEvaluationRequest<ResultT>(
  payload: MaybeRef<SequenceExplanationPost | SequenceExplanationRequestBlockingError>,
  handleReply: (reply: object) => ResultOrError<ResultT>,
) {
  const url = TWEETY_API_URL + '/sequence-explanation'

  const evaluationBlocker: Ref<Error | null> = computed(() => {
    const payloadValue = unref(payload)
    if (payloadValue instanceof SequenceExplanationRequestBlockingError) {
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
    if (payloadValue instanceof SequenceExplanationRequestBlockingError) {
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
  handleReply: (reply: object) => {
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
  if (typeof reply !== 'object') {
    console.error(`Could not parse reply ${String(reply)}.`)
    return {
      result: null,
      error: 'Unexpected evaluation result.',
    }
  }

  return handleReply(reply)
}
