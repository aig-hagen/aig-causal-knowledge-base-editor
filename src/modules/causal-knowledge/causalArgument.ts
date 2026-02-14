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
import type { ArgumentId } from '@/modules/argumentation/argumentationFramework'
import type { Literal } from '@/modules/causal-knowledge/composables/useEvaluationRequestPayload'
import type { Atom, Id } from '@/modules/causal-knowledge/graphicalCausalKnowledgeBase'
import { getDisplayName } from '@/modules/causal-knowledge/stores/knowledgeBase'

export function parsePremisesAndConlusions(causalArgumentId: string) {
  const causalArgumentRegex = /^\(\[((?:!?\d(?:, !?\d)*)?)\] -> (!?\d)\)$/

  const result = causalArgumentRegex.exec(causalArgumentId)

  if (result === null) {
    throw new Error('Unsupported causal argument ID: ' + causalArgumentId)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const premisesString = result[1]!
  const premises = premisesString === '' ? [] : premisesString.split(',').map(convertToLiteral)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const conclusion = convertToLiteral(result[2]!)

  return {
    premises,
    conclusion,
  }
}

function convertToLiteral(literalString: string) {
  literalString = literalString.trim()
  if (literalString.startsWith('!')) {
    return {
      atomId: Number(literalString.slice(1)),
      negated: true,
    }
  }

  return {
    atomId: Number(literalString),
    negated: false,
  }
}

export interface CausalArgumentData {
  id: ArgumentId
  name: string
  premises: Literal[]
  conclusion: Literal
}

export function getCausalArgumentData(
  argumentId: string,
  atoms: Map<Id, Atom>,
): CausalArgumentData {
  const { premises, conclusion } = parsePremisesAndConlusions(argumentId)

  let name = ''
  if (premises.length > 0) {
    name += premises.map((premis) => getLiteralName(premis, atoms)).join(', ')
    name += ' '
  }
  name += '→ '
  name += getLiteralName(conclusion, atoms)

  return {
    id: argumentId,
    name: name,
    premises,
    conclusion,
  }
}

export function getLiteralName(literal: Literal, atoms: Map<Id, Atom>) {
  const atom = atoms.get(literal.atomId)
  if (atom === undefined) {
    throw new Error(`Atom with ID ${String(literal.atomId)} not found.`)
  }
  return getDisplayName(atom, literal.negated)
}
