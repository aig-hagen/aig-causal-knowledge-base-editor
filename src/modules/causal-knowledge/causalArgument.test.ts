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
import { expect, test } from 'vitest'
import { parsePremisesAndConlusions } from '@/modules/causal-knowledge/causalArgument'
import type { Literal } from './composables/useEvaluationRequestPayload'

const validCausalArgumentIds: [string, Literal[], Literal][] = [
  [
    '([] -> 1)',
    [],
    {
      atomId: 1,
      negated: false,
    },
  ],
  [
    '([1] -> !2)',
    [
      {
        atomId: 1,
        negated: false,
      },
    ],
    {
      atomId: 2,
      negated: true,
    },
  ],
  [
    '([1, !2] -> !3)',
    [
      {
        atomId: 1,
        negated: false,
      },
      {
        atomId: 2,
        negated: true,
      },
    ],
    {
      atomId: 3,
      negated: true,
    },
  ],
  [
    '([1, !2, 3] -> 4)',
    [
      {
        atomId: 1,
        negated: false,
      },
      {
        atomId: 2,
        negated: true,
      },
      {
        atomId: 3,
        negated: false,
      },
    ],
    {
      atomId: 4,
      negated: false,
    },
  ],
]

test.for(validCausalArgumentIds)(
  `${parsePremisesAndConlusions.name}(%s)-> %o %o`,
  ([id, premises, conclusion]) => {
    const result = parsePremisesAndConlusions(id)

    expect(result.premises).toEqual(premises)
    expect(result.conclusion).toEqual(conclusion)
  },
)

const invalidCausalArgumentIds: [string][] = [['([] -> 1'], ['([1] -> !a)'], ['([1,!2] -> !3)']]

test.for(invalidCausalArgumentIds)(`${parsePremisesAndConlusions.name}(%s) fails`, ([id]) => {
  expect(() => parsePremisesAndConlusions(id)).toThrowError(`Unsupported causal argument ID: ${id}`)
})
