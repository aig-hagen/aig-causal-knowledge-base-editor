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
import attributionsUntyped from '@/../third-party/attribution.json'
import type { Attribution } from '@/modules/third-party-licenses/types'

const attributions = attributionsUntyped as Attribution[]

function getAttributionId(attribution: Attribution) {
  let key = ''
  if (attribution.scope !== undefined) {
    key += attribution.scope
  }

  key += attribution.name

  if (attribution.version !== undefined) {
    key += attribution.version
  }
  return key
}
</script>

<template>
  <div class="mx-auto max-w-6xl p-6">
    <div class="flex flex-col gap-8 lg:flex-row">
      <aside class="lg:w-64 lg:shrink-0">
        <ul class="menu bg-base-100 border-base-300 rounded-box border p-2 lg:sticky lg:top-4">
          <li class="menu-title">Third-Party Licenses</li>
          <li v-for="attribution of attributions" :key="getAttributionId(attribution)">
            <a :href="'#' + getAttributionId(attribution)"
              ><template v-if="attribution.scope !== undefined">@{{ attribution.scope }}/</template
              >{{ attribution.name }}</a
            >
          </li>
        </ul>
      </aside>
      <div class="min-w-0 flex-1 space-y-4">
        <h1 class="text-2xl font-bold">Third-Party Licenses</h1>
        <p class="text-base-content/80 text-sm">
          This application makes use of open-source software components. We gratefully acknowledge
          the developers and contributors of these projects. The following attributions are provided
          to comply with applicable open-source licenses.
        </p>
        <template v-for="attribution of attributions" :key="getAttributionId(attribution)">
          <div class="border-base-300 space-y-2 border-t pt-4">
            <h6 :id="getAttributionId(attribution)" class="font-semibold">
              <template v-if="attribution.scope !== undefined">@{{ attribution.scope }}/</template
              >{{ attribution.name
              }}<template v-if="attribution.version !== undefined"
                >@{{ attribution.version }}</template
              >
            </h6>

            <p class="text-base-content/80 text-sm">
              Published<template v-if="attribution.publisher">
                by <em> {{ attribution.publisher }}</em></template
              >
              under <em>{{ attribution.license }}</em> at
              <a class="link" :href="attribution.repository">{{ attribution.repository }}</a
              >.
            </p>
            <blockquote
              v-if="attribution.licenseText"
              class="bg-base-200 border-base-300 rounded-box overflow-x-auto border p-4 font-mono text-xs whitespace-pre-wrap"
            >
              {{ attribution.licenseText }}
            </blockquote>
            <p v-else class="text-base-content/80 text-sm">
              This software component provides no license text.
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
