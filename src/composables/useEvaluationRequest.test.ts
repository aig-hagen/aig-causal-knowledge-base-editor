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
import { beforeAll, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { handleConclusionsReply, useEvaluationRequest } from './useEvaluationRequest'
import {
  ConjunctionIsNotTargetedError,
  type EvaluationRequestPayload,
} from './useEvaluationRequestPayload'

import { type AsyncResponseResolverReturnType, http, HttpResponse, type DefaultBodyType } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach } from 'vitest'

const server = setupServer()
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})
afterAll(() => {
  server.close()
})
afterEach(() => {
  server.resetHandlers()
})

async function useOkResponse(responseBody: Record<string, unknown>) {
  return useResponse(HttpResponse.json(responseBody))
}

async function useResponse<BodyType extends DefaultBodyType>(
  response: AsyncResponseResolverReturnType<BodyType>,
) {
  server.use(http.all('*', () => response))
  const { evaluationResult, evaluationError, evaluate } = useEvaluationRequest(
    fakePayload(),
    handleConclusionsReply,
  )
  evaluate.value?.()
  await vi.waitUntil(() => evaluationError.value !== null || evaluationResult.value != null)
  return { result: evaluationResult.value, error: evaluationError.value }
}

function fakePayload(): EvaluationRequestPayload {
  return {} as EvaluationRequestPayload
}

it('should disable request for invalid payload', () => {
  const error = new ConjunctionIsNotTargetedError({ sourceId: 1, targetId: 1 })

  const { evaluationBlocker, evaluate } = useEvaluationRequest(error, handleConclusionsReply)

  expect(evaluate.value).toBeNull()
  expect(evaluationBlocker.value).toEqual(error)
})

it('should enable request for valid payload', () => {
  const { evaluationBlocker, evaluate } = useEvaluationRequest(
    fakePayload(),
    handleConclusionsReply,
  )

  expect(evaluate.value).not.toBeNull()
  expect(evaluationBlocker.value).toBeNull()
})

it('should not evaluate immediatly', () => {
  const { isEvaluating, abortEvaluation } = useEvaluationRequest(
    fakePayload(),
    handleConclusionsReply,
  )

  expect(abortEvaluation.value).toBeNull()
  expect(isEvaluating.value).toBeFalsy()
})

it('should abort evaluation', async () => {
  server.use(
    http.all('*', async () => {
      await new Promise(() => {
        /*never settle*/
      })
      throw new Error('never')
    }),
  )
  const { evaluate, isEvaluating, evaluationError, evaluationResult, abortEvaluation } =
    useEvaluationRequest(fakePayload(), handleConclusionsReply)

  evaluate.value?.()
  await nextTick()

  expect(isEvaluating.value).toBe(true)
  expect(evaluationError.value).toBeNull()
  expect(evaluationResult.value).toBeNull()
  expect(abortEvaluation.value).not.toBeNull()
  expect(evaluate.value).toBeNull()

  abortEvaluation.value?.()
  await vi.waitUntil(() => !isEvaluating.value)

  expect(isEvaluating.value).toBeFalsy()
  expect(evaluationError.value).toBe('Evaluation failed: This operation was aborted')
  expect(evaluationResult.value).toBeNull()
  expect(abortEvaluation.value).toBeNull()
  expect(evaluate.value).not.toBeNull()
})

it('changing payload should reset result', async () => {
  const payload = ref(fakePayload())
  server.use(
    http.all('*', () => {
      return HttpResponse.json({
        status: 'SUCCESS',
        reply: '[1,!2]',
      })
    }),
  )
  const { evaluate, isEvaluating, evaluationError, evaluationResult, abortEvaluation } =
    useEvaluationRequest(payload, handleConclusionsReply)
  evaluate.value?.()
  await vi.waitUntil(() => evaluationResult.value !== null)

  payload.value = fakePayload()
  await vi.waitUntil(() => evaluationResult.value === null)

  expect(isEvaluating.value).toBeFalsy()
  expect(evaluationError.value).toBeNull()
  expect(evaluationResult.value).toBeNull()
  expect(abortEvaluation.value).toBeNull()
  expect(evaluate.value).not.toBeNull()
})

it('changing payload to new payload should abort executeion', async () => {
  const payload = ref(fakePayload())
  server.use(
    http.all('*', async () => {
      await new Promise(() => {
        /*never settle*/
      })
      throw new Error('never')
    }),
  )
  const { evaluate, isEvaluating, evaluationError, evaluationResult, abortEvaluation } =
    useEvaluationRequest(payload, handleConclusionsReply)
  evaluate.value?.()
  await vi.waitUntil(() => isEvaluating.value)

  payload.value = fakePayload()
  await vi.waitUntil(() => !isEvaluating.value)

  expect(isEvaluating.value).toBeFalsy()
  expect(evaluationError.value).toBeNull()
  expect(evaluationResult.value).toBeNull()
  expect(abortEvaluation.value).toBeNull()
  expect(evaluate.value).not.toBeNull()
})

it('should report response without status as error', async () => {
  const response = {}

  const { result, error } = await useOkResponse(response)

  expect(error).toBe(`Unexpected evaluation result.`)
  expect(result).toBeNull()
})

it('should report timeout as error', async () => {
  const response = {
    status: 'TIMEOUT',
  }

  const { result, error } = await useOkResponse(response)

  expect(error).toBe(`Evaluation timed out.`)
  expect(result).toBeNull()
})

it('should report unexpected status as error', async () => {
  const response = {
    status: 'unexpected',
  }

  const { result, error } = await useOkResponse(response)

  expect(error).toBe(`Unexpected evaluation result.`)
  expect(result).toBeNull()
})

it('should report missing reply as an error', async () => {
  const response = {
    status: 'SUCCESS',
  }

  const { result, error } = await useOkResponse(response)

  expect(error).toBe(`Unexpected evaluation result.`)
  expect(result).toBeNull()
})

it('should report unexpected literal as an error', async () => {
  const response = {
    status: 'SUCCESS',
    reply: '[a]',
  }

  const { result, error } = await useOkResponse(response)

  expect(error).toBe(`Unexpected evaluation reply.`)
  expect(result).toBeNull()
})

it('should parse correct reply with literals', async () => {
  const response = {
    status: 'SUCCESS',
    reply: '[1, !2]',
  }

  const { result, error } = await useOkResponse(response)

  expect(error).toBeNull()
  expect(result).toEqual([
    {
      atomId: 1,
      negated: false,
    },
    {
      atomId: 2,
      negated: true,
    },
  ])
})

it('should parse correct empty reply', async () => {
  const response = {
    status: 'SUCCESS',
    reply: '[]',
  }

  const { result, error } = await useOkResponse(response)

  expect(error).toBeNull()
  expect(result).toEqual([])
})

it('should report response with error status', async () => {
  const response = HttpResponse.text('Internal server errror.', { status: 500 })

  const { result, error } = await useResponse(response)

  expect(error).toBe(`Evaluation failed: Internal Server Error`)
  expect(result).toBeNull()
})

it('should report error for response with invalid json', async () => {
  const response = HttpResponse.text('[')

  const { result, error } = await useResponse(response)

  expect(error).toBe(`Unexpected evaluation result.`)
  expect(result).toBeNull()
})

it('should report error for response with non-object JSON', async () => {
  const response = HttpResponse.text('[]')

  const { result, error } = await useResponse(response)

  expect(error).toBe(`Unexpected evaluation result.`)
  expect(result).toBeNull()
})

it('should report error for empty response', async () => {
  const response = HttpResponse.text()

  const { result, error } = await useResponse(response)

  expect(error).toBe(`Unexpected evaluation result.`)
  expect(result).toBeNull()
})
