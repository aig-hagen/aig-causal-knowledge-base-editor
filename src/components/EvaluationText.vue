<script setup lang="ts">
import type { Atom, Id } from '@/model/graphicalCausalKnowledgeBase'
import { type Literal } from '@/composables/useEvaluationRequestPayload'
import { getDisplayName } from '@/stores/knowledgeBase'
import { computed } from 'vue'

const props = defineProps<{
  atoms: Map<number, Atom>
  observations: Literal[]
  conclusions: Literal[]
  requesedAtomsForConclusion: Id[]
}>()

const conclusionsToShow = computed(() => {
  return props.conclusions.filter((conclusion) =>
    props.requesedAtomsForConclusion.includes(conclusion.atomId),
  )
})

const showNoFurtherConclusions = computed(() => {
  if (conclusionsToShow.value.length === 0) {
    return false
  }
  const allRequestedConclusionsHaveAResult = props.requesedAtomsForConclusion.every((atomId) =>
    props.conclusions.some((conclusion) => conclusion.atomId == atomId),
  )
  return !allRequestedConclusionsHaveAResult
})

function getName(atomId: Id, negated: boolean): string {
  const atom = props.atoms.get(atomId)
  if (atom === undefined) {
    throw new Error(`Atom with ID ${String(atomId)} not found.`)
  }
  return getDisplayName(atom, negated)
}
</script>

<template>
  <div>
    <p>
      Given the assumptions and the causal model,
      <template v-if="observations.length === 0">from no observations </template>
      <template v-else-if="observations.length === 1"
        >from the observation
        <span class="is-underlined">{{
          getName(observations[0].atomId, observations[0].negated)
        }}</span>
        <span v-html="` `"></span>
      </template>
      <template v-else-if="observations.length > 1"
        >from the observations
        <template
          v-for="observation in observations.slice(0, -2)"
          :key="`${observation.atomId}-${observation.negated}`"
          ><span class="is-underlined">{{ getName(observation.atomId, observation.negated) }} </span
          >, </template
        ><span class="is-underlined">{{
          getName(
            observations[observations.length - 2].atomId,
            observations[observations.length - 2].negated,
          )
        }}</span>
        and
        <span class="is-underlined">{{
          getName(
            observations[observations.length - 1].atomId,
            observations[observations.length - 1].negated,
          )
        }}</span
        ><span v-html="` `"></span>
      </template>
      <template v-if="conclusionsToShow.length === 0">follow no conclusions.</template>
      <template v-else-if="conclusionsToShow.length === 1"
        >follows
        <span class="is-underlined">{{
          getName(conclusionsToShow[0].atomId, conclusionsToShow[0].negated)
        }}</span
        >.
      </template>
      <template v-else-if="conclusionsToShow.length > 1"
        >follows:
        <ul>
          <template
            v-for="conclusion in conclusionsToShow.slice(0, -1)"
            :key="`${conclusion.atomId}-${conclusion.negated}`"
          >
            <li>
              <span
                ><span class="is-underlined">{{
                  getName(conclusion.atomId, conclusion.negated)
                }}</span></span
              >
            </li>
          </template>
          <li>
            <span>
              <span class="is-underlined">{{
                getName(
                  conclusionsToShow[conclusionsToShow.length - 1].atomId,
                  conclusionsToShow[conclusionsToShow.length - 1].negated,
                )
              }}</span
              >.</span
            >
          </li>
        </ul>
      </template>
    </p>
    <p v-if="showNoFurtherConclusions">For other atoms, no conclusions can be made.</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: '- ';
}
li {
  list-style-position: inside;
}
</style>
