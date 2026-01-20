<script setup lang="ts">
import attributionsUntyped from '@/../third-party/attribution.json'
import type { Attribution } from './types'

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
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <section class="section">
          <aside class="menu">
            <p class="menu-label">Third-Party Licenses</p>
            <ul class="menu-list">
              <li v-for="attribution of attributions" :key="getAttributionId(attribution)">
                <a :href="'#' + getAttributionId(attribution)"
                  ><template v-if="attribution.scope !== undefined"
                    >@{{ attribution.scope }}/</template
                  >{{ attribution.name }}</a
                >
              </li>
            </ul>
          </aside>
        </section>
      </div>
      <div class="column is-">
        <section class="section">
          <div class="content">
            <h1>Third-Party Licenses</h1>
            <p>
              This application makes use of open-source software components. We gratefully
              acknowledge the developers and contributors of these projects. The following
              attributions are provided to comply with applicable open-source licenses.
            </p>
            <template v-for="attribution of attributions" :key="getAttributionId(attribution)">
              <h6 :id="getAttributionId(attribution)">
                <template v-if="attribution.scope !== undefined">@{{ attribution.scope }}/</template
                >{{ attribution.name
                }}<template v-if="attribution.version !== undefined"
                  >@{{ attribution.version }}</template
                >
              </h6>

              <p>
                Published<template v-if="attribution.publisher">
                  by <em> {{ attribution.publisher }}</em></template
                >
                under <em>{{ attribution.license }}</em> at
                <a :href="attribution.repository">{{ attribution.repository }}</a
                >.
              </p>
              <blockquote v-if="attribution.licenseText" style="white-space: pre-wrap">
                {{ attribution.licenseText }}
              </blockquote>
              <p v-else>This software component provides no license text.</p>
            </template>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style></style>
