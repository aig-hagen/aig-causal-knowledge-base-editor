import { test, expect } from 'vitest'
import { deserializeFromDtoString } from '@/argumentation/serialization/ArgumentationFrameworkDTO'
import { JsonSyntaxError, ValidationError } from '@/common/serialization'

const FILE_NAME = 'test.json'

function deserializeWithErrors(badData: string) {
  const result = deserializeFromDtoString(badData, FILE_NAME)
  expect(result).toBeDefined()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return result.errors!
}

test('fail importing JSON with syntax error', () => {
  const badData = '{[}'

  const errors = deserializeWithErrors(badData)

  expect.soft(errors[0]).toBeInstanceOf(JsonSyntaxError)
  expect
    .soft(errors[0]?.message)
    .toBe(
      "The provided file `test.json` is not a valid JSON file: Expected property name or '}' in JSON at position 1 (line 1 column 2)",
    )
})

test('fail importing JSON with missing property', () => {
  const data = {
    apiVersion: 'graphical-argumentation-framework/v1',
    arguments: [],
  }
  const stringifiedData = JSON.stringify(data)

  const errors = deserializeWithErrors(stringifiedData)

  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(ValidationError)
  expect
    .soft(errors[0]?.message)
    .toEqual(
      'The provided file `test.json` contains invalid data:\n' +
        '\n' +
        '✖ Invalid input: expected array, received undefined\n' +
        '  → at attacks\n',
    )
})

test('fail importing JSON with duplicate id', () => {
  const data = {
    apiVersion: 'graphical-argumentation-framework/v1',
    arguments: [
      {
        id: '1',
        name: 'aName',
        graphicalData: {
          shape: 'circle',
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        id: '1',
        name: 'aName',
        graphicalData: {
          shape: 'circle',
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    ],
    attacks: [],
  }
  const stringifiedData = JSON.stringify(data)

  const errors = deserializeWithErrors(stringifiedData)
  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(ValidationError)
  expect
    .soft(errors[0]?.message)
    .toEqual(
      'The provided file `test.json` contains invalid data:\n' +
        '\n' +
        '✖ Duplicate argument with ID `1`\n' +
        '  → at arguments[0].id\n' +
        '✖ Duplicate argument with ID `1`\n' +
        '  → at arguments[1].id\n',
    )
})

test('fail importing JSON with duplicate attack', () => {
  const data = {
    apiVersion: 'graphical-argumentation-framework/v1',
    arguments: [
      {
        id: '1',
        name: 'aName',
        graphicalData: {
          shape: 'circle',
          position: {
            x: 0,
            y: 0,
          },
        },
      },
      {
        id: '2',
        name: 'aName',
        graphicalData: {
          shape: 'circle',
          position: {
            x: 0,
            y: 0,
          },
        },
      },
    ],
    attacks: [
      {
        attacker: '1',
        attacked: '2',
      },
      {
        attacker: '1',
        attacked: '2',
      },
    ],
  }
  const stringifiedData = JSON.stringify(data)

  const errors = deserializeWithErrors(stringifiedData)
  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(ValidationError)
  expect
    .soft(errors[0]?.message)
    .toEqual(
      'The provided file `test.json` contains invalid data:\n' +
        '\n' +
        '✖ Duplicate attack from `1` to `2`.\n' +
        '  → at attacks[0]\n' +
        '✖ Duplicate attack from `1` to `2`.\n' +
        '  → at attacks[1]\n',
    )
})

test('fail importing JSON with unknown attacks', () => {
  const data = {
    apiVersion: 'graphical-argumentation-framework/v1',
    arguments: [],
    attacks: [
      {
        attacker: '1',
        attacked: '2',
      },
    ],
  }
  const stringifiedData = JSON.stringify(data)

  const errors = deserializeWithErrors(stringifiedData)
  expect(errors).toHaveLength(1)
  expect.soft(errors[0]).toBeInstanceOf(ValidationError)
  expect
    .soft(errors[0]?.message)
    .toEqual(
      'The provided file `test.json` contains invalid data:\n' +
        '\n' +
        '✖ Unkonwn argument `1`.\n' +
        '  → at attacks[0].attacker\n' +
        '✖ Unkonwn argument `2`.\n' +
        '  → at attacks[0].attacked\n',
    )
})
