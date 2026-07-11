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
import { type CausalArgument } from '../causalArgument'
import type { Atom, Id } from '../graphicalCausalKnowledgeBase'
import type { Literal } from '../composables/useEvaluationRequestPayload'
import { getDisplayName } from '../stores/knowledgeBase'
import { hasOneEntry } from '@/modules/common/types'
import AtomName from './AtomName.vue'

const { argument, atoms } = defineProps<{
  argument: CausalArgument
  atoms: Map<Id, Atom>
}>()

function getAtomName(literal: Literal): string {
  const atom = atoms.get(literal.atomId)
  if (atom === undefined) {
    throw new Error(`Atom with ID ${String(literal.atomId)} not found.`)
  }
  return getDisplayName(atom, false)
}
</script>
<template>
  <div class="text-lg font-semibold"><h1>Argument description</h1></div>
  <template v-if="argument.premises.length === 0">
    <AtomName
      class="underline"
      :name="getAtomName(argument.conclusion)"
      :negated="argument.conclusion.negated"
    />
    always holds
    <br />given the assumptions.
  </template>
  <template v-else>
    <template v-if="hasOneEntry(argument.premises)"
      >From the premise
      <AtomName
        class="underline"
        :name="getAtomName(argument.premises[0])"
        :negated="argument.premises[0].negated"
      />
      <br />
    </template>
    <template v-else-if="argument.premises.length > 1"
      >From the premises
      <ul>
        <template
          v-for="premise in argument.premises"
          :key="`${premise.atomId}-${premise.negated}`"
        >
          <li>
            <AtomName class="underline" :name="getAtomName(premise)" :negated="premise.negated" />
          </li>
        </template>
      </ul>
    </template>
    follows
    <AtomName
      class="underline"
      :name="getAtomName(argument.conclusion)"
      :negated="argument.conclusion.negated"
    />.
  </template>
</template>

<style scoped>
ul {
  list-style-type: '- ';
}
li {
  list-style-position: inside;
}
</style>
