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
import { arrow, offset, useFloating, autoUpdate } from '@floating-ui/vue'
import { computed, toRef, useTemplateRef } from 'vue'

const { reference, offsetX } = defineProps<{
  reference: HTMLElement | null
  offsetX: number
}>()

const color = 'var(--bulma-info)'
const arrowHeadHeight = 16
const arrowHeadWidht = 8
const arrowWidht = 4
const offsetArrowHeadX = -arrowHeadHeight

const floating = useTemplateRef('floating')
const floatingArrow = useTemplateRef('floatingArrow')

const { floatingStyles, middlewareData } = useFloating(
  toRef(() => reference),
  floating,
  {
    placement: 'right',
    middleware: [offset(offsetX), arrow({ element: floatingArrow })],
    whileElementsMounted: autoUpdate,
  },
)
</script>
<template>
  <div ref="floating" :style="floatingStyles" class="message is-info menu-hint">
    <div
      class="message-body"
      :style="{
        borderInlineStartColor: color,
      }"
    >
      <slot></slot>
    </div>
    <div
      ref="floatingArrow"
      :style="{
        position: 'absolute',
        top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
        left: `${-offsetX - offsetArrowHeadX}px`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }"
    >
      <div
        :style="{
          borderTop: `${arrowHeadWidht}px solid transparent`,
          borderBottom: `${arrowHeadWidht}px solid transparent`,
          borderRight: `${arrowHeadHeight}px solid ${color}`,
          width: 0,
        }"
      ></div>
      <div
        :style="{
          borderTop: `${arrowWidht / 2}px solid ${color}`,
          borderBottom: `${arrowWidht / 2}px solid ${color}`,
          width: `${offsetX - arrowHeadHeight + offsetArrowHeadX}px`,
          height: 0,
        }"
      ></div>
    </div>
  </div>
</template>

<style>
.menu-hint {
  border-inline-start-color:;
}
</style>
