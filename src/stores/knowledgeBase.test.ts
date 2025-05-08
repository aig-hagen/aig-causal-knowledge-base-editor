import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import {
  InvalidDataError,
  JsonSyntaxError,
  SchemaMismatchError,
  useKnowledgeBase,
} from './knowledgeBase'

beforeEach(() => {
  setActivePinia(createPinia())
})

const TEST_FILE_NAME = 'test.json'
const STATIC_SCHEMA_DATA = `
    "$schema": "https://causal-knowledge-base-editor.aig.fernuni-hagen.de/graphical-causal-knowledge-base-v1.schema.json",
    "apiVersion": "graphical/v1",
  `

test('fail importing JSON with syntax error', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(TEST_FILE_NAME, `{ a }`)

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(JsonSyntaxError)
  expect
    .soft(errors[0].message)
    .toBe(
      "The provided file `test.json` is not a valid JSON file: Expected property name or '}' in JSON at position 2 (line 1 column 3)",
    )
})

test('fail importing JSON not matching schema', () => {
  const knowledgeBase = useKnowledgeBase()

  const errors = knowledgeBase.importKnowledgeBase(TEST_FILE_NAME, '{}')

  expect(errors).toHaveLength(5)
  expect.soft(errors[0]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[0].message)
    .toBe(
      "Data does not match the expected schema: test.json must have required property '$schema'",
    )
  expect.soft(errors[1]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[1].message)
    .toBe(
      "Data does not match the expected schema: test.json must have required property 'apiVersion'",
    )
  expect.soft(errors[2]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[2].message)
    .toBe("Data does not match the expected schema: test.json must have required property 'atoms'")
  expect.soft(errors[3]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[3].message)
    .toBe(
      "Data does not match the expected schema: test.json must have required property 'operators'",
    )
  expect.soft(errors[4]).toBeInstanceOf(SchemaMismatchError)
  expect
    .soft(errors[4].message)
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
    .soft(errors[0].message)
    .toBe(
      'Data does not match the expected schema: test.json/connections/0/id/sourceId must be >= 0',
    )
  expect.soft(errors[1]).toBeInstanceOf(SchemaMismatchError)
  // The ID should not be greater than 9007199254740991 otherwise it will not be a safe integer.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
  expect
    .soft(errors[1].message)
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
    .soft(errors[0].message)
    .toBe(
      'The provided file `test.json` contains invalid data: Multiple connections from the source `1` to the target `2` exist.',
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
    .soft(errors[0].message)
    .toBe(
      "The provided file `test.json` contains invalid data: A connection's source ID `1` does not exist.",
    )
  expect.soft(errors[1]).toBeInstanceOf(InvalidDataError)
  expect
    .soft(errors[1].message)
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
    .soft(errors[0].message)
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
    .soft(errors[0].message)
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
    .soft(errors[0].message)
    .toBe(
      'The provided file `test.json` contains invalid data: Multiple atoms or operators with the ID `1` exist.',
    )
})
