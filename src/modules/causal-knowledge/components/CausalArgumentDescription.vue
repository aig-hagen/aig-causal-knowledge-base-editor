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
import type { Argument } from '@/modules/argumentation/argumentationFramework'
import { getLiteralName } from '../causalArgument'
import type { Atom, Id } from '../graphicalCausalKnowledgeBase'
import { hasOneEntry } from '@/modules/common/types'

const { argument, atoms } = defineProps<{
  argument: Argument
  atoms: Map<Id, Atom>
}>()
</script>
<template>
  <div class="title is-5"><h1>Argument description</h1></div>
  <template v-if="argument.premises.length === 0">
    <span class="is-underlined">{{ getLiteralName(argument.conclusion, atoms) }} </span> always
    holds.
  </template>
  <template v-else>
    <template v-if="hasOneEntry(argument.premises)"
      >From the premise
      <span class="is-underlined">{{ getLiteralName(argument.premises[0], atoms) }}</span>
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
            <span
              ><span class="is-underlined">{{ getLiteralName(premise, atoms) }}</span></span
            >
          </li>
        </template>
      </ul>
    </template>
    follows <span class="is-underlined">{{ getLiteralName(argument.conclusion, atoms) }}</span
    >.
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
