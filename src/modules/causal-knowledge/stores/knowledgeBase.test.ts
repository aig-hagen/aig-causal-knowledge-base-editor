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
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import { useKnowledgeBase } from '@/modules/causal-knowledge/stores/knowledgeBase'
import {
  InvalidDataError,
  JsonSyntaxError,
  SchemaMismatchError,
} from '@/modules/common/serialization'

beforeEach(() => {
  setActivePinia(createPinia())
})

const TEST_FILE_NAME = 'test.json'
const STATIC_SCHEMA_DATA = `
    "apiVersion": "graphical/v1",
  `

test('fail importing JSON with syntax error', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(TEST_FILE_NAME, `{ a }`)

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(JsonSyntaxError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      "The provided file `test.json` is not a valid JSON file: Expected property name or '}' in JSON at position 2 (line 1 column 3)",
    )
})

test('fail importing JSON not matching schema', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(TEST_FILE_NAME, '{}')

  expect(errors).toHaveLength(4)
  expect.soft(errors[0]).toBeInstanceOf(SchemaMismatchError)
  expect.soft(errors[0]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      "Data does not match the expected schema: test.json must have required property 'apiVersion'",
    )
  expect.soft(errors[1]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[1]?.message)
    .toBe("Data does not match the expected schema: test.json must have required property 'atoms'")
  expect.soft(errors[3]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[2]?.message)
    .toBe(
      "Data does not match the expected schema: test.json must have required property 'operators'",
    )
  expect.soft(errors[3]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[3]?.message)
    .toBe(
      "Data does not match the expected schema: test.json must have required property 'connections'",
    )
})

test('fail importing JSON with invalid IDs', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [],
      "operators": [],
      "connections": [
        {
          "id": {
            "sourceId": -1,
            "targetId": 9007199254740992
          },
          "negated": false
        }
      ]
    }`,
  )

  expect(errors).toHaveLength(2)
  expect.soft(errors[0]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'Data does not match the expected schema: test.json/connections/0/id/sourceId must be >= 0',
    )
  expect.soft(errors[1]).toBeInstanceOf(SchemaMismatchError)
  // The ID should not be greater than 9007199254740991 otherwise it will not be a safe integer.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
  expect
    .soft(errors[1]?.message)
    .toBe(
      'Data does not match the expected schema: test.json/connections/0/id/targetId must be <= 9007199254740991',
    )
})

test('fail importing duplicate connections', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [
        {
          "id": 1,
          "name": "",
          "description": "",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "operators": [
        {
          "id": 2,
          "type": "conjunction",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "connections": [
        {
          "id": {
            "sourceId": 1,
            "targetId": 2
          },
          "negated": false
        },
        {
          "id": {
            "sourceId": 1,
            "targetId": 2
          },
          "negated": true
        }
      ]
    }`,
  )

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'The provided file `test.json` contains invalid data: Multiple connections from the source `1` to the target `2` exist.',
    )
})

test('fail importing connection between two operators', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [],
      "operators": [
        {
          "id": 1,
          "type": "conjunction",
          "position": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": 2,
          "type": "conjunction",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "connections": [
        {
          "id": {
            "sourceId": 2,
            "targetId": 1
          },
          "negated": false
        }
      ]
    }`,
  )

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'The provided file `test.json` contains invalid data: Only connections between atoms and conjunctions are allowed, but the conjunction `2` connects to the conjunction `1`',
    )
})

test('fail importing connection between two atoms', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [
        {
          "id": 1,
          "name": "",
          "description": "",
          "position": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": 2,
          "name": "",
          "description": "",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "operators": [],
      "connections": [
        {
          "id": {
            "sourceId": 2,
            "targetId": 1
          },
          "negated": false
        }
      ]
    }`,
  )

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'The provided file `test.json` contains invalid data: Only connections between atoms and conjunctions are allowed, but the atom `2` connects to the atom `1`',
    )
})

test('fail importing connections referencing missing IDs', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [],
      "operators": [],
      "connections": [
        {
          "id": {
            "sourceId": 1,
            "targetId": 2
          },
          "negated": false
        }
      ]
    }`,
  )

  expect(errors).toHaveLength(2)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      "The provided file `test.json` contains invalid data: A connection's source ID `1` does not exist.",
    )
  expect.soft(errors[1]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[1]?.message)
    .toBe(
      "The provided file `test.json` contains invalid data: A connection's target ID `2` does not exist.",
    )
})

test('fail importing JSON with duplicate atom IDs', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [
        {
          "id": 1,
          "name": "",
          "description": "",
          "position": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": 1,
          "name": "",
          "description": "",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "operators": [],
      "connections": []
    }`,
  )

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'The provided file `test.json` contains invalid data: Multiple atoms or operators with the ID `1` exist.',
    )
})

test('fail importing JSON with duplicate operator IDs', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [],
      "operators": [
        {
          "id": 1,
          "type": "conjunction",
          "position": {
            "x": 0,
            "y": 0
          }
        },
        {
          "id": 1,
          "type": "conjunction",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "connections": []
    }`,
  )

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'The provided file `test.json` contains invalid data: Multiple atoms or operators with the ID `1` exist.',
    )
})

test('fail importing JSON with duplicate operator and atom IDs', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(
    TEST_FILE_NAME,
    `{
      ${STATIC_SCHEMA_DATA}
      "atoms": [
        {
          "id": 1,
          "name": "",
          "description": "",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "operators": [
        {
          "id": 1,
          "type": "conjunction",
          "position": {
            "x": 0,
            "y": 0
          }
        }
      ],
      "connections": []
    }`,
  )

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      'The provided file `test.json` contains invalid data: Multiple atoms or operators with the ID `1` exist.',
    )
})
