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
  addArgument,
  addAttack,
  createArgumentationFramework,
  hasArgument,
  type Argument,
  type ArgumentationFramework,
} from '../argumentation/argumentationFramework'
import type { AttackDTO } from '../sequence-explanation/composables/useSequenceExplanationRequest'
import { getCausalArgumentData, type CausalArgument } from './causalArgument'
import type { Atom, Id } from './graphicalCausalKnowledgeBase'

export function argumentationFrameworkFromCausalArguments(
  attacks: AttackDTO[],
  atoms: Map<Id, Atom>,
): ArgumentationFramework<CausalArgument> {
  const argumentationFramework = createArgumentationFramework<CausalArgument>()
  for (const attack of attacks) {
    const { attacker: attackerId, attacked: attackedId } = attack
    if (!hasArgument(argumentationFramework, attackerId)) {
      const attackerArgument: Argument = {
        ...getCausalArgumentData(attackerId, atoms),
        graphicalData: {
          shape: 'rectangle',
          position: {
            x: 0,
            y: 0,
          },
        },
      }
      addArgument(argumentationFramework, attackerArgument)
    }
    if (!hasArgument(argumentationFramework, attackedId)) {
      const attackedArgument: Argument = {
        ...getCausalArgumentData(attackedId, atoms),
        graphicalData: {
          shape: 'rectangle',
          position: {
            x: 0,
            y: 0,
          },
        },
      }
      addArgument(argumentationFramework, attackedArgument)
    }
    addAttack(argumentationFramework, attackerId, attackedId)
  }
  return argumentationFramework
}
