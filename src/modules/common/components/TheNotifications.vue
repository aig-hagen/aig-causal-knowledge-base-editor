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
import { useNotifications } from '@/modules/common/stores/notifications'
import { X } from '@lucide/vue'
const notifications = useNotifications()
</script>

<template>
  <div class="notifications">
    <div
      v-for="notification in notifications.notifications"
      :key="notification.id"
      role="alert"
      :class="[
        'alert',
        'shadow-lg',
        notification.type === 'error' ? 'alert-error' : 'alert-success',
      ]"
    >
      <div style="white-space: pre-wrap" class="text-sm">{{ notification.message }}</div>
      <button
        v-if="notification.type === 'error'"
        class="btn btn-circle btn-ghost btn-xs"
        aria-label="Dismiss"
        @click="notifications.removeNotification(notification.id)"
      >
        <X class="size-4" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.notifications {
  max-width: 512px;
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}
</style>
