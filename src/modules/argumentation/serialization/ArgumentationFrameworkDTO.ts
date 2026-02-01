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
import * as z from 'zod'
import {
  addArgument,
  addAttack,
  createArgumentationFramework,
  getArguments,
  getAttacks,
  type ArgumentationFramework,
} from '../argumentationFramework'
import {
  JsonSyntaxError,
  ValidationError,
  type DeserializationResult,
} from '@/modules/common/serialization'
import { getOrSet } from '@/modules/common/map'

const API_VERSION = 'graphical-argumentation-framework/v1' as const

const ArgumentId = z.string()

const Shape = z.union([z.literal('circle'), z.literal('rectangle')])

const Position = z.strictObject({
  x: z.number(),
  y: z.number(),
})

const GraphicalData = z.strictObject({
  shape: Shape,
  position: Position,
})

const Argument = z.strictObject({
  id: ArgumentId,
  name: z.string(),
  graphicalData: GraphicalData,
})

const Attack = z.strictObject({
  attacker: ArgumentId,
  attacked: ArgumentId,
})

const ArgumentationFrameworkDTO = z
  .strictObject({
    apiVersion: z.literal('graphical-argumentation-framework/v1'),
    arguments: z.array(Argument).superRefine((arguments_, ctx) => {
      const perSeenIdToIdx = new Map()
      arguments_.forEach((argument, idx) => {
        if (perSeenIdToIdx.has(argument.id)) {
          const previousIndex = perSeenIdToIdx.get(argument.id)
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate argument with ID \`${argument.id}\``,
            path: [previousIndex, 'id'],
            params: { id: argument.id },
            input: arguments_[previousIndex],
          })
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate argument with ID \`${argument.id}\``,
            path: [idx, 'id'],
            params: { id: argument.id },
            input: argument,
          })
        } else {
          perSeenIdToIdx.set(argument.id, idx)
        }
      })
    }),
    attacks: z.array(Attack).superRefine((attacks, ctx) => {
      const perAttackerToPerSeenAttackedIdx = new Map<string, Map<string, number>>()
      attacks.forEach((attack, idx) => {
        const { attacker, attacked } = attack
        const perSeenAttackedIdx = getOrSet(
          perAttackerToPerSeenAttackedIdx,
          attacker,
          () => new Map(),
        )
        if (perSeenAttackedIdx.has(attacked)) {
          const previousIndex = perSeenAttackedIdx.get(attacked)
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate attack from \`${attacker}\` to \`${attacked}\`.`,
            path: [previousIndex],
            params: { id: attacked },
            input: attacks[previousIndex],
          })
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate attack from \`${attacker}\` to \`${attacked}\`.`,
            path: [idx],
            params: { id: attacked },
            input: attack,
          })
        } else {
          perSeenAttackedIdx.set(attacked, idx)
        }
      })
    }),
  })
  .superRefine((argumentationFramework, ctx) => {
    const knownArgumentIds = new Set(
      argumentationFramework.arguments.map((argument) => argument.id),
    )

    argumentationFramework.attacks.forEach((attack, idx) => {
      const { attacker, attacked } = attack
      if (!knownArgumentIds.has(attacker)) {
        ctx.addIssue({
          code: 'custom',
          message: `Unkonwn argument \`${attacker}\`.`,
          path: ['attacks', idx, 'attacker'],
          params: { id: attacker },
          input: attacker,
        })
      }

      if (!knownArgumentIds.has(attacked)) {
        ctx.addIssue({
          code: 'custom',
          message: `Unkonwn argument \`${attacked}\`.`,
          path: ['attacks', idx, 'attacked'],
          params: { id: attacked },
          input: attacked,
        })
      }
    })
  })
type ArgumentationFrameworkDTO = z.infer<typeof ArgumentationFrameworkDTO>

export function serializeToDto(
  argumentationFramework: ArgumentationFramework,
): ArgumentationFrameworkDTO {
  const allAguments = getArguments(argumentationFramework)
  const attacks = getAttacks(argumentationFramework)

  const dto = {
    apiVersion: API_VERSION,
    arguments: allAguments.map((argument) => ({
      id: argument.id,
      name: argument.name,
      graphicalData: {
        shape: argument.graphicalData.shape,
        position: {
          x: argument.graphicalData.position.x,
          y: argument.graphicalData.position.y,
        },
      },
    })),
    attacks: attacks.map(([attacker, attacked]) => ({
      attacker: attacker,
      attacked: attacked,
    })),
  }

  return dto
}

export function deserializeFromDtoString(
  dtoString: string,
  fileName: string,
): DeserializationResult<ArgumentationFramework> {
  let unvalidatedData: unknown
  try {
    unvalidatedData = JSON.parse(dtoString)
  } catch (e) {
    return {
      success: false,
      errors: [new JsonSyntaxError((e as Error).message, fileName)],
    }
  }

  const result = ArgumentationFrameworkDTO.safeParse(unvalidatedData)
  if (!result.success) {
    return {
      success: false,
      errors: [new ValidationError(z.prettifyError(result.error), fileName)],
    }
  }
  const dto = result.data

  const argumentationFramework = createArgumentationFramework()
  for (const argument of dto.arguments) {
    addArgument(argumentationFramework, argument)
  }
  for (const { attacker, attacked } of dto.attacks) {
    addAttack(argumentationFramework, attacker, attacked)
  }

  return {
    success: true,
    data: argumentationFramework,
  }
}
