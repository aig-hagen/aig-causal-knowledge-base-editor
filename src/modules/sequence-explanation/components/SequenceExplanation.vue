<!--
  Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.

  Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<script setup lang="ts">
import { computed } from 'vue'
import * as Colors from '@/modules/common/colors'
import type { DialectialSequenceExplanationDTO } from '@/modules/sequence-explanation/DialectialSequenceExplanationDTO'
import {
  addEdge,
  addNode,
  createDirectedGraph,
  getEdges,
  hasEdge,
  hasNode,
} from '@/modules/graph/graph'
import {
  addArgument,
  addAttack,
  createArgumentationFramework,
  getArgument,
  getAttacks,
  type Argument,
  type ArgumentationFramework,
  type ArgumentId,
} from '@/modules/argumentation/argumentationFramework'
import ArgumentationFrameworkEditor from '@/modules/argumentation/components/ArgumentationFrameworkEditor.vue'
import {
  ARGUMENT_HEIGHT_IN_PX,
  ARGUMENT_RADIUS_IN_PX,
  ARGUMENT_WIDTH_IN_PX,
} from '@/modules/argumentation/consts'

const { explanation, argumentationFramework } = defineProps<{
  explanation: DialectialSequenceExplanationDTO
  argumentationFramework: ArgumentationFramework<Argument>
}>()

const supporters = computed(() => {
  return new Set(explanation.supporters.flatMap((supporters) => supporters))
})

function nodeColorFn(argumentId: ArgumentId) {
  return getArgumentColor(supporters.value.has(argumentId))
}

function getArgumentColor(isSupport: boolean) {
  const COLOR_SUPPORTES = Colors.NODE_GREEN
  const COLOR_DEFEATED = Colors.NODE_RED
  // The colors are taken form "Sequence Explanations for Acceptance in Abstract Argumentation" by Lars Bengel and Matthias Thimm
  if (isSupport) {
    return COLOR_SUPPORTES
  } else {
    return COLOR_DEFEATED
  }
}

const sequenceExplanationGraph = computed(() => {
  // Create directed graph for lookup
  const directedGraph = createDirectedGraph<string, string>((argumentId) => argumentId)
  for (const [...defeated] of explanation.defeated) {
    for (const argument of defeated) {
      addNode(directedGraph, argument)
    }
  }
  for (const [...supporters] of explanation.supporters) {
    for (const argument of supporters) {
      addNode(directedGraph, argument)
    }
  }
  for (const [attacker, attacked] of getAttacks(argumentationFramework)) {
    const atteckerInNodes = hasNode(directedGraph, attacker)
    if (!atteckerInNodes) {
      continue
    }
    const attackedInNodes = hasNode(directedGraph, attacked)
    if (!attackedInNodes) {
      continue
    }
    addEdge(directedGraph, attacker, attacked)
  }

  // Create init layout of arguments in columns and rows
  const columns = new Array<(string | undefined)[]>(
    explanation.defeated.length + explanation.supporters.length,
  )
  for (let columnIdx = 0; columnIdx < columns.length; columnIdx++) {
    const isSupporters = columnIdx % 2 === 0
    const argumentsInColumn = isSupporters
      ? explanation.supporters[Math.floor(columnIdx / 2)]
      : explanation.defeated[Math.floor(columnIdx / 2)]
    if (argumentsInColumn === undefined) {
      throw new Error('No argument list found.')
    }
    const column: string[] = []
    columns[columnIdx] = column
    for (const argument of argumentsInColumn) {
      column.push(argument)
    }
  }

  // This avoids nodes overlaping horizonatal links.
  // This was the most notable issue until now with sequence explanations.
  // NOTE More elaborate layouting dealing with even more problematic layouting cases would be nice but is out of scope.
  for (let rowIdx = 0; ; rowIdx++) {
    let noMoreRows = true
    for (const column of columns) {
      if (column.length > rowIdx) {
        noMoreRows = false
      }
    }
    if (noMoreRows) {
      break
    }
    for (let columnStartIdx = 0; columnStartIdx < columns.length; columnStartIdx++) {
      const argumentStart = columns[columnStartIdx]?.[rowIdx]
      if (argumentStart === undefined) {
        continue
      }
      let needsToMoveDown = false
      for (
        let columndEndIdx = columns.length - 1;
        columndEndIdx > columnStartIdx;
        columndEndIdx--
      ) {
        const argumentEnd = columns[columndEndIdx]?.[rowIdx]
        if (argumentEnd === undefined) {
          continue
        }
        if (needsToMoveDown) {
          columns[columndEndIdx]?.unshift(undefined)
        }
        if (
          hasEdge(directedGraph, argumentStart, argumentEnd) ||
          hasEdge(directedGraph, argumentStart, argumentEnd)
        ) {
          needsToMoveDown = true
        }
      }
    }
  }

  const perColumnIdxWidht: number[] = []
  const perRowIdxHeight: number[] = []
  columns.forEach((column, columnIdx) => {
    for (let rowIdx = 0; rowIdx < column.length; rowIdx++) {
      const argumentId = column[rowIdx]
      if (argumentId === undefined) {
        continue
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const argument = getArgument(argumentationFramework, argumentId)!

      let width = X_SPACING
      if (argument.graphicalData.shape === 'rectangle') {
        width += ARGUMENT_WIDTH_IN_PX
      } else {
        width += ARGUMENT_RADIUS_IN_PX * 2
      }

      const maxWidth = perColumnIdxWidht[columnIdx] ?? 0
      perColumnIdxWidht[columnIdx] = Math.max(maxWidth, width)

      let height = Y_SPACING
      if (argument.graphicalData.shape === 'rectangle') {
        height += ARGUMENT_HEIGHT_IN_PX
      } else {
        height += ARGUMENT_RADIUS_IN_PX * 2
      }

      const maxHeight = perRowIdxHeight[rowIdx] ?? 0
      perRowIdxHeight[rowIdx] = Math.max(maxHeight, height)
    }
  })

  const layoutedArgumentationFramework = createArgumentationFramework()
  let x = 0
  columns.forEach((column, columnIdx) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const columnWidht = perColumnIdxWidht[columnIdx]!
    x += columnWidht
    let y = 0
    for (let rowIdx = 0; rowIdx < column.length; rowIdx++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const rowHeight = perRowIdxHeight[rowIdx]!
      y += rowHeight
      const argumentId = column[rowIdx]
      if (argumentId !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const originalArgument = getArgument(argumentationFramework, argumentId)!
        const argument: Argument = {
          ...originalArgument,
          graphicalData: {
            shape: originalArgument.graphicalData.shape,
            position: {
              x: x - columnWidht / 2,
              y: y - rowHeight / 2,
            },
          },
        }
        addArgument(layoutedArgumentationFramework, argument)
      }
    }
  })

  for (const [attacker, attacked] of getEdges(directedGraph)) {
    addAttack(layoutedArgumentationFramework, attacker, attacked)
  }
  return layoutedArgumentationFramework
})

const Y_SPACING = 64
const X_SPACING = Y_SPACING

const NODE_TYPES = [
  {
    name: 'Supporter',
    color: getArgumentColor(true),
  },
  {
    name: 'Defeated',
    color: getArgumentColor(false),
  },
]
</script>

<template>
  <ArgumentationFrameworkEditor
    :argumentationFramework="sequenceExplanationGraph"
    :readonly="true"
    :disableSelection="!$slots.argumentMenu"
    :nodeColorFn="nodeColorFn"
    :nodeTypes="NODE_TYPES"
  >
    <template v-if="$slots.argumentMenu" #argumentMenu="slotProps">
      <slot name="argumentMenu" v-bind="slotProps" />
    </template>
  </ArgumentationFrameworkEditor>
</template>

<style scoped></style>
