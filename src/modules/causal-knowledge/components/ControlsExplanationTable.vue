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
const { sourceName, targetName, linkName } = defineProps<{
  sourceName: string
  targetName: string
  linkName: string
}>()
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Action</th>
        <th>Control</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Create {{ sourceName }}</td>
        <td><kbd>Left double-click</kbd> on canvas</td>
      </tr>
      <tr>
        <td>Delete {{ sourceName }}</td>
        <td><kbd>Right-click</kbd> on {{ sourceName }} and hold</td>
      </tr>
      <tr>
        <td>Move {{ sourceName }}</td>
        <td><kbd>Left-click</kbd> on {{ sourceName }}, hold and drag</td>
      </tr>
      <tr>
        <td>Create {{ linkName }}</td>
        <td><kbd>Right-click</kbd> on {{ sourceName }}, hold and drag towards {{ targetName }}</td>
      </tr>
      <tr>
        <td>Delete {{ linkName }}</td>
        <td><kbd>Right-click</kbd> on {{ linkName }} and hold</td>
      </tr>
      <tr>
        <td>Pan</td>
        <td><kbd>Left-click</kbd> on canvas, hold and drag</td>
      </tr>
      <tr>
        <td>Zoom in/out</td>
        <td><kbd>Scroll wheel</kbd> on canvas</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th {
  font-weight: 700;
}
</style>
